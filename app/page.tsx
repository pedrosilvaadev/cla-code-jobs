import { JobBoard } from "@/components/job-board";

export default async function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <JobBoard />
    </main>
  );
}
