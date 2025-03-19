import { JobBoard } from "@/components/job-board";
import { getJobs } from "@/lib/db-connection";

export default async function Home() {
  const jobs = await getJobs();
  return (
    <main className="container mx-auto py-8 px-4">
      <JobBoard initialJobs={jobs} />
    </main>
  );
}
