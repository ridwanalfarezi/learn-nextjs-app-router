import JobListItem from "@/components/JobListItem";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisma";
import Link from "next/link";

const AdminPage = async () => {
  const unapproved = await prisma.job.findMany({
    where: {
      approved: false,
    },
  });
  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <H1 className="text-center">Admin Dashboard</H1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved Jobs</h2>
        {unapproved.map((job) => (
          <Link key={job.id} href={`/admin/jobs/${job.slug}`}>
            <JobListItem key={job.id} job={job} />
          </Link>
        ))}
        {unapproved.length === 0 && (
          <p className="text-muted-foreground">No unapproved jobs</p>
        )}
      </section>
    </main>
  );
};

export default AdminPage;
