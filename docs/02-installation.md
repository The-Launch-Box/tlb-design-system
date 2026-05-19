# Installation Guide

Steps for bringing the TLB UI standard into a new or existing TLB internal repository. Assumes React 19, Vite, and TypeScript (the established TLB stack).

## 0. Prerequisites

- Node.js 20.11 or newer
- A Vite plus React plus TypeScript app, or a fresh `npm create vite@latest`
- TailwindCSS v4 (`tailwindcss@^4`) and `@tailwindcss/vite`
- Git, with the working tree clean before you start

## 1. Install the Dependency Set

```bash
npm install \
  class-variance-authority clsx tailwind-merge lucide-react \
  @radix-ui/react-slot \
  react-hook-form @hookform/resolvers zod \
  @tanstack/react-table \
  recharts \
  date-fns \
  sonner

npm install -D tailwindcss @tailwindcss/vite
```

For state shared across routes, add `zustand`. Do not add it preemptively.

## 2. Drop in the Starter Kit

Copy the following from `tlb-ui-standards/starter-kit/` into the new repo:

| Source | Destination |
|---|---|
| `starter-kit/components.json` | repository root (next to `package.json`) |
| `starter-kit/tailwind.css` | `src/styles/tailwind.css` |
| `starter-kit/lib-utils.ts` | `src/lib/utils.ts` |
| `starter-kit/AGENTS.md.template` | `AGENTS.md` at repo root |
| `starter-kit/.cursorrules.template` | `.cursorrules` at repo root |

Also copy `tlb-ui-standards/CLAUDE.md` to the repo root as `CLAUDE.md`.

## 3. Wire Tailwind v4 into Vite

`vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

`tsconfig.json` paths block:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Import the Tailwind stylesheet once at the root entry (`src/main.tsx`):

```ts
import "@/styles/tailwind.css";
```

## 4. Initialize shadcn

```bash
npx shadcn@latest init
```

When the CLI asks, accept the defaults that match `components.json` from the starter kit. The CLI verifies that `src/lib/utils.ts` exports `cn`, that `src/styles/tailwind.css` exists, and that the `@/` alias resolves.

## 5. Install the Baseline Components

Every TLB app installs the following on first setup. These are the components most internal screens need:

```bash
npx shadcn@latest add button input label textarea select checkbox radio-group switch \
  card dialog alert-dialog sheet tooltip popover dropdown-menu \
  table tabs separator badge skeleton sonner \
  form
```

`sonner` is the toast component. Mount the `Toaster` once at the app root:

```tsx
// src/App.tsx
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      {/* routes */}
      <Toaster richColors closeButton />
    </>
  );
}
```

## 6. Confirm Tokens Render

Drop a smoke-test page into the app temporarily:

```tsx
// src/pages/smoke.tsx
import { Button } from "@/components/ui/button";

export default function Smoke() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-display uppercase text-tlb-orange">TLB UI Smoke Test</h1>
      <p className="text-foreground">Body text in Helvetica.</p>
      <Button>Primary action</Button>
      <Button variant="secondary">Secondary action</Button>
      <Button variant="destructive">Destructive action</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
```

Run `npm run dev`. The "TLB UI Smoke Test" header must render orange (`#FF6600`). Buttons must use the TLB palette. Delete the smoke route once verified.

## 7. Configure Linting

Adopt the standard ESLint config from `starter-kit/eslint.config.js` if present. At minimum, ensure these rules are enabled:

- `@typescript-eslint/no-explicit-any: error`
- `react-hooks/exhaustive-deps: error`
- `react-refresh/only-export-components: warn`

## 8. Verify Compliance

Run through the checklist in `docs/09-do-and-dont.md` before opening the first feature PR. If anything fails, fix it in the setup PR (not later).

## Going Forward

Add new shadcn components on demand:

```bash
npx shadcn@latest add <component-name>
```

Never re-implement a primitive that shadcn ships. If a primitive is missing from shadcn, build a composite in `src/components/` on top of Radix directly and document it.
