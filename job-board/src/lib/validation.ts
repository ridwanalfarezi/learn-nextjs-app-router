import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, "Title is required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    return !file || (file instanceof File && file.type.startsWith("image/"));
  }, "Must be an image")
  .refine((file) => {
    return !file || file.size < 2 * 1024 * 1024;
  }, "FIle size must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z
      .string()
      .max(100)
      .email("Must be a valid email")
      .optional()
      .or(z.literal("")),
    applicationUrl: z
      .string()
      .max(100)
      .url("Must be a valid URL")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Must be a valid email or URL",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) => !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required if location type is not remote",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(9, "Must be less than 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJob = z.infer<typeof createJobSchema>;

export const JobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilter = z.infer<typeof JobFilterSchema>;

