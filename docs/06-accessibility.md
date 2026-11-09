# Accessibility

TLB internal apps target WCAG 2.2 AA. The bar applies to every TLB-built internal tool. The Radix-based shadcn primitives carry most of the heavy lifting. The rules below are the parts engineers and AI agents still own.

## Non-Negotiable Requirements

1. **Every interactive element has a discernible name.** Buttons with only icons require `aria-label`. shadcn `Button` does not auto-derive a name from an icon child.
2. **Every form input has a label.** Visible labels preferred. Where a visible label is impossible, use `aria-label`.
3. **Tab order is logical and complete.** Test with the keyboard alone. Every focusable element receives focus in document order.
4. **Focus rings are visible.** Do not remove the shadcn focus styles. Custom buttons retain `focus-visible:ring`.
5. **Color is never the sole carrier of meaning.** Status badges include text. Form errors include text under the field, not just a red border.
6. **Contrast meets AA.** 4.5:1 for body text, 3:1 for large text and UI components. TLB orange (`#FF6400`) on white is 3.0:1, so it only passes as large text or a UI mark. Body copy stays black.
7. **Motion respects `prefers-reduced-motion`.** Tailwind v4 supports this via `motion-safe:` and `motion-reduce:` variants.
8. **Trapped focus inside modals.** Dialog and AlertDialog handle this automatically. Do not add custom modal containers that defeat this.

## Patterns That Get Accessibility Right

### Icon-only buttons

```tsx
<Button variant="ghost" size="icon" aria-label="Open user menu">
  <User className="h-4 w-4" />
</Button>
```

### Form fields

The shadcn `Form` integration wires `aria-describedby` to the `FormMessage` automatically when a validation error fires. Use the integration, do not reach for raw inputs.

### Tables

The DataTable composite renders semantic `<table>`, `<thead>`, `<tbody>`. Sortable column headers are buttons inside the `<th>`, not `<div>` with click handlers. Do not bypass this.

### Loading states

When a section is loading, render the skeleton (which carries `aria-busy`) rather than removing the section. A removed section confuses screen readers.

### Live regions

Toasts via Sonner use an `aria-live="polite"` region. Errors that block submission use `role="alert"`. Use the existing infrastructure. Do not introduce a second live region.

## Color Contrast Quick Reference

Measured on the tlb-financial-tools tokens (WCAG 2.1 relative luminance).

| Pair | Ratio | Verdict |
|---|---|---|
| `foreground #1F2328` on card `#FFFFFF` | 15.8:1 | AA + AAA |
| `foreground #1F2328` on canvas `#F6F8FA` | 14.8:1 | AA + AAA |
| `muted-foreground #57606A` on `#FFFFFF` | 6.4:1 | AA, body OK |
| dark `foreground #f0f6fc` on `#0d1117` | 17.4:1 | AA + AAA |
| dark `muted-foreground #8b949e` on card `#161b22` | 5.6:1 | AA, body OK |
| black label on TLB orange `#FF6400` (the primary button) | 7.1:1 | AA, body OK |
| TLB orange `#FF6400` on dark canvas `#0d1117` | 6.4:1 | AA, body OK |
| TLB orange `#FF6400` on `#FFFFFF` | 3.0:1 | Large text and UI marks only. Never body. |
| TLB accent ink `#E35C00` on `#FFFFFF` | 3.6:1 | Large text only (the display-font headings it is used for). |
| destructive `#FF3300` on `#FFFFFF`, or white on it | 3.7:1 | Large text and UI marks only. Pair with an icon and words. |

The rule that follows: on the light canvas, orange and red never carry body-size text. The primary button is legible because its label is **black** on orange (`--accent-foreground`), not white. Light-theme accent text uses `text-accent-ink`, reserved for headings at `text-2xl` and up and for figures in the display face.

Important: the primary Button variant renders `--color-primary-foreground` (white) on `--color-primary` (orange). This passes AA only above 18pt or 14pt bold per WCAG large-text rules. We accept this because shadcn buttons render at `text-sm font-medium` (14px medium) which falls into the failing zone for small text. Mitigation: keep button labels short and use the `lg` size for primary CTAs where the screen design allows. For body-sized actions, prefer `outline` or `secondary` variants which keep dark text on light fills.

## Testing Checklist

Before any UI ships:

1. Keyboard pass. Disconnect the mouse. Walk every interactive element with `Tab`, `Shift+Tab`, `Enter`, `Space`. Confirm focus is always visible.
2. Screen reader pass (best effort). NVDA on Windows or VoiceOver on macOS. Walk one full task flow per feature. Confirm names announce sensibly.
3. Axe DevTools scan. Zero serious or critical violations. Address moderate violations or note them as accepted in the PR description.
4. Contrast check. Open DevTools, pick text color and background color for any new component, confirm the ratio meets AA.
5. Reduced motion. Toggle the OS preference. Confirm animations stop or slow.
6. Zoom to 200%. Confirm layout does not break and primary content remains usable.

## Things That Look Like Accessibility but Are Not

- A `title` attribute on a button does not give it a name for a screen reader. Use `aria-label` or visible text.
- A red outline does not communicate error to a colorblind user. Use a text message under the field.
- A `tabindex="0"` on a `<div>` does not make it a button. Use `<button>` (or shadcn `Button`).
- A custom `onKeyDown` handler does not replace the semantics of a native input. Use the native input.
- A `placeholder` is not a substitute for a `Label`. Both can exist; only `Label` is required.

## Escalation

If a feature has an accessibility constraint that cannot be met with the standard patterns (rare), document the deviation in the PR description and notify Jonatan Hernandez Jr (UI Reviewer). Do not ship an accessibility regression silently.
