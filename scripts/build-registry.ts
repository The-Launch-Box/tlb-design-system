/**
 * scripts/build-registry.ts
 *
 * Reads `registry/registry.json` (the hand-authored index of components),
 * inlines the source file contents from `src/`, validates each manifest
 * against the shadcn `registry-item.json` schema, and emits one JSON file
 * per component to `public/r/<name>.json`. Also writes
 * `public/r/registry.json` as a top-level index.
 *
 * Run via:
 *   npm run build:registry
 *
 * Output is consumed by the shadcn CLI in consumer repos:
 *   npx shadcn@latest add https://the-launch-box.github.io/tlb-design-system/r/button.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  RegistryIndexSchema,
  RegistryItemSchema,
  type RegistryItem,
} from "../registry/schema.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const INDEX_PATH = join(ROOT, "registry", "registry.json");
const OUT_DIR = join(ROOT, "public", "r");
const PAGES_BASE =
  "https://the-launch-box.github.io/tlb-design-system/r/";

/**
 * Packages we never declare as dependencies on a registry manifest, because
 * shadcn assumes the consumer's host app already provides them.
 */
const PEER_DEPENDENCIES = new Set(["react", "react-dom"]);

function readSource(relPath: string): string {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) {
    throw new Error(`Source file not found: ${relPath}`);
  }
  return readFileSync(abs, "utf8");
}

function detectNpmDependencies(source: string): string[] {
  const importRegex = /^import[\s\S]*?from\s+["']([^"']+)["']/gm;
  const found = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(source)) !== null) {
    const spec = match[1];
    if (!spec || spec.startsWith(".") || spec.startsWith("@/")) continue;
    const isScoped = spec.startsWith("@");
    const pkg = isScoped
      ? spec.split("/").slice(0, 2).join("/")
      : spec.split("/")[0];
    if (!pkg || PEER_DEPENDENCIES.has(pkg)) continue;
    found.add(pkg);
  }
  return Array.from(found).sort();
}

function manifestUrl(name: string): string {
  return `${PAGES_BASE}${name}.json`;
}

function main(): void {
  const rawIndex = JSON.parse(readFileSync(INDEX_PATH, "utf8"));
  const index = RegistryIndexSchema.parse(rawIndex);

  mkdirSync(OUT_DIR, { recursive: true });

  let successCount = 0;
  for (const entry of index.items) {
    const filesWithContent = entry.files.map((file) => {
      const content = readSource(`src/${file.path}`);
      const autoDeps = detectNpmDependencies(content);
      return { content, autoDeps, file };
    });

    const allAutoDeps = new Set<string>();
    for (const { autoDeps } of filesWithContent) {
      autoDeps.forEach((d) => allAutoDeps.add(d));
    }
    for (const d of entry.dependencies ?? []) allAutoDeps.add(d);

    const manifest: RegistryItem = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: entry.name,
      type: entry.type,
      description: entry.description,
      dependencies: Array.from(allAutoDeps).sort(),
      registryDependencies: (entry.registryDependencies ?? []).map((dep) =>
        dep.startsWith("http") || dep.includes("/")
          ? dep
          : manifestUrl(dep)
      ),
      files: filesWithContent.map(({ file, content }) => ({
        path: `components/ui/${file.path.split("/").pop()}`,
        content,
        type: file.type,
        target: file.target ?? `components/ui/${file.path.split("/").pop()}`,
      })),
    };

    const validated = RegistryItemSchema.parse(manifest);
    const outPath = join(OUT_DIR, `${entry.name}.json`);
    writeFileSync(outPath, JSON.stringify(validated, null, 2) + "\n", "utf8");
    successCount += 1;
    console.log(`emitted r/${entry.name}.json (${validated.dependencies?.length ?? 0} deps)`);
  }

  const topLevel = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: index.name,
    homepage: index.homepage,
    items: index.items.map((entry) => ({
      name: entry.name,
      type: entry.type,
      description: entry.description,
    })),
  };
  writeFileSync(
    join(OUT_DIR, "registry.json"),
    JSON.stringify(topLevel, null, 2) + "\n",
    "utf8"
  );
  console.log(`emitted r/registry.json with ${index.items.length} items`);
  console.log(`done. ${successCount} component manifests written to ${OUT_DIR}`);
}

main();
