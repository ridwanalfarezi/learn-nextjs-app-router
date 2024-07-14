"use client";

import { approveJob, rejectJob } from "@/app/admin/jobs/[slug]/actions";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

interface AdminSidebarProps {
  job: Job;
}

interface ApproveButtonProps {
  jobId: number;
}

const ApproveSubmissionButton = ({ jobId }: ApproveButtonProps) => {
  const [formState, formAction] = useFormState(approveJob, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input name="jobId" value={jobId} hidden />
      <SubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </SubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
};
const RejectSubmissionButton = ({ jobId }: ApproveButtonProps) => {
  const [formState, formAction] = useFormState(rejectJob, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input name="jobId" value={jobId} hidden />
      <SubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Reject
      </SubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
};

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-sm font-semibold text-green-500">Approved</span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}

      <RejectSubmissionButton jobId={job.id} />
    </aside>
  );
}
