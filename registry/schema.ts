import { z } from "zod";

/**
 * Local zod mirror of the shadcn `registry-item.json` schema.
 * Used by `scripts/build-registry.ts` to validate every emitted manifest before
 * it ships to GitHub Pages.
 *
 * Spec: https://ui.shadcn.com/schema/registry-item.json
 */

export const RegistryItemFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: z.enum([
    "registry:lib",
    "registry:block",
    "registry:component",
    "registry:ui",
    "registry:hook",
    "registry:theme",
    "registry:page",
    "registry:file",
    "registry:style",
  ]),
  target: z.string().optional(),
});

export const RegistryItemSchema = z.object({
  $schema: z.string().optional(),
  name: z.string().min(1),
  type: z.enum([
    "registry:lib",
    "registry:block",
    "registry:component",
    "registry:ui",
    "registry:hook",
    "registry:theme",
    "registry:page",
    "registry:file",
    "registry:style",
  ]),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(RegistryItemFileSchema),
  cssVars: z
    .object({
      light: z.record(z.string(), z.string()).optional(),
      dark: z.record(z.string(), z.string()).optional(),
    })
    .optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryItemFile = z.infer<typeof RegistryItemFileSchema>;

/**
 * The hand-authored index that `scripts/build-registry.ts` reads from
 * `registry/registry.json`. Each entry omits `files[].content` (filled in
 * from disk at build time).
 */
export const RegistryIndexEntrySchema = z.object({
  name: z.string(),
  type: z.literal("registry:ui"),
  description: z.string(),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(
    z.object({
      path: z.string(),
      type: z.literal("registry:ui"),
      target: z.string().optional(),
    })
  ),
});

export const RegistryIndexSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  homepage: z.string().url().optional(),
  items: z.array(RegistryIndexEntrySchema),
});

export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;
export type RegistryIndexEntry = z.infer<typeof RegistryIndexEntrySchema>;
