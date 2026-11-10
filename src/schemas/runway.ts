import { z } from "zod";

export const runwaySchema = z.object({
  cash: z.coerce.number().min(0, "Enter zero or more"),
  revenue: z.coerce.number().min(0, "Enter zero or more"),
  burn: z.coerce.number().min(1, "Enter a monthly burn above zero"),
  growth: z.coerce.number().min(-20, "Minimum is -20%").max(50, "Maximum is 50%"),
});

export type RunwayInputs = z.infer<typeof runwaySchema>;
export type RunwayFormValues = z.input<typeof runwaySchema>;
