"use client";

import H1 from "@/components/ui/h1";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="mx-auto my-10 max-w-5xl space-y-5 px-3 text-center">
      <H1>Error</H1>
      <p>{error.message}</p>
    </main>
  );
}
