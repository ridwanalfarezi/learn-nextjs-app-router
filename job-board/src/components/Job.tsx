import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { JobFilter } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import JobListItem from "./JobListItem";

type JobProps = {
  filterValues: JobFilter;
  page?: number;
};

const Job = async ({ filterValues, page = 1 }: JobProps) => {
  const { q, type, location, remote } = filterValues;

  const jobPerPage = 6;

  const skip = (page - 1) * jobPerPage;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          {
            title: {
              search: searchString,
            },
          },
          {
            companyName: {
              search: searchString,
            },
          },
          {
            type: {
              search: searchString,
            },
          },
          {
            locationType: {
              search: searchString,
            },
          },
          {
            location: {
              search: searchString,
            },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      {
        approved: true,
      },
    ],
  };

  const jobsPromise = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    take: jobPerPage,
    skip: skip,
  });

  const countPromise = prisma.job.count({
    where,
  });

  const [jobs, total] = await Promise.all([jobsPromise, countPromise]);
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`}>
          <JobListItem key={job.id} job={job} />
        </Link>
      ))}
      {jobs.length === 0 && <p className="m-auto text-center">No jobs found</p>}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / jobPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
};

export default Job;

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilter;
};

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, type, location, remote },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
