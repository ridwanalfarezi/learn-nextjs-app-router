import { Metadata } from "next";
import CreateJobForm from "./CreateJobForm";

export const metadata: Metadata = {
  title: "Post a new Job",
};

export default function Page() {
  return <CreateJobForm />;
}
