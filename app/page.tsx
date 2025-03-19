import { JobBoard } from "@/components/job-board";
import { getJobs } from "./actions";

export default async function Home() {
  const { data } = await getJobs();

  return (
    <main className="container mx-auto py-8 px-4">
      <JobBoard initialJobs={data || []} />
    </main>
  );
}
