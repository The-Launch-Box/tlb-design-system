import { z } from "zod";

export type CatStatus = "available" | "pending" | "adopted";

export interface Cat {
  id: string;
  name: string;
  age: string;
  breed: string;
  temperament: string;
  goodWithKids: boolean;
  status: CatStatus;
}

export interface Application {
  id: string;
  catId: string;
  catName: string;
  applicant: string;
  email: string;
  submitted: string;
}

export const applicationSchema = z.object({
  applicant: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  notes: z.string().trim().max(300, "Keep notes under 300 characters").optional(),
});

export type ApplicationValues = z.infer<typeof applicationSchema>;
