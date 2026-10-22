import { z } from "zod";
import { EDUCATION_LEVELS, EVENT_TYPES, GENDERS } from "@/lib/constants";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((v) => new Date(v) < new Date(), "Date of birth must be in the past"),
  gender: z.enum(GENDERS, { message: "Select a gender" }),
});

export const registerEventSchema = z.object({
  linkedinProfile: z
    .string()
    .refine(
      (v) => v === "" || /^https?:\/\/([\w-]+\.)?linkedin\.com\/.+/i.test(v),
      "Enter a valid LinkedIn URL (https://linkedin.com/in/...)"
    ),
  educationLevel: z.string(),
  motivation: z.string().max(500, "Motivation must be 500 characters or less"),
});

export const createEventSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  max_attendees: z
    .string()
    .refine((v) => /^\d+$/.test(v) && Number(v) > 0, "Enter a whole number greater than 0"),
  event_date: z
    .string()
    .min(1, "Event date is required")
    .refine((v) => new Date(v) > new Date(), "Event date must be in the future"),
  event_type: z.enum(EVENT_TYPES, { message: "Select an event type" }),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type RegisterEventForm = z.infer<typeof registerEventSchema>;
export type CreateEventForm = z.infer<typeof createEventSchema>;
export { EDUCATION_LEVELS };
