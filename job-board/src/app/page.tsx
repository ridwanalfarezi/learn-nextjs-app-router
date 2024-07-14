import Job from "@/components/Job";
import JobFilter from "@/components/JobFilter";
import H1 from "@/components/ui/h1";
import { JobFilter as JobFilterValues } from "@/lib/validation";

type SearchParams = {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
};

const getTitle = ({ q, type, location, remote }: JobFilterValues) => {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} jobs`
      : remote
        ? "remote jobs"
        : "all jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return titlePrefix + titleSuffix;
};

export function generateMetadata({
  searchParams: { q, type, location, remote, page },
}: SearchParams) {
  return {
    title: `${getTitle({ q, type, location, remote: remote === "true" })
      .toLowerCase()
      .replace(/(?:^|\s|["'([{])+\S/g, (match) =>
        match.toUpperCase(),
      )} | Job Board`,
  };
}

export default async function Home({
  searchParams: { q, type, location, remote, page },
}: SearchParams) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1 className="capitalize">{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">
          Find your next developer dream job.
        </p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilter defaultValues={filterValues} />
        <Job filterValues={filterValues} page={page ? parseInt(page) : 1} />
      </section>
    </main>
  );
}
