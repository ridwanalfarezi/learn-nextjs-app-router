import DetailJob from "@/components/DetailJob";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type JobProps = {
  params: {
    slug: string;
  };
};

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });

  if (!job) return notFound();

  return job;
});

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      slug: true,
    },
  });
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: JobProps): Promise<Metadata> {
  const job = await getJob(slug);
  return {
    title: job.title,
  };
}

export default async function Page({ params: { slug } }: JobProps) {
  const job = await getJob(slug);

  const { applicationUrl, applicationEmail } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <DetailJob job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}
