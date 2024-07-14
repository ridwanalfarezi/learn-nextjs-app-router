"use server";

import prisma from "@/lib/prisma";
import { convertToSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import path from "path";

export async function createNewJob(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    description,
    salary,
    applicationEmail,
    applicationUrl,
  } = createJobSchema.parse(values);

  const slug = `${convertToSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );
    companyLogoUrl = blob.url;
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      description: description?.trim(),
      salary: parseInt(salary),
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
    },
  });

  redirect("/job-submitted");
}
