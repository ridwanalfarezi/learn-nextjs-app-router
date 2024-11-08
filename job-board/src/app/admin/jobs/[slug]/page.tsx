import AdminSidebar from "@/components/AdminSidebar";
import DetailJob from "@/components/DetailJob";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type JobProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: JobProps) {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });

  if (!job) notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <DetailJob job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}
