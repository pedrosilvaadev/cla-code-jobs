import { JobCard } from "@/components/job-card";
import { Job } from "@/lib/types";
import { Button } from "@/components/ui/button";

export const JobList = ({
  filteredJobs,
  jobs,
  handleClearFilters,
}: {
  filteredJobs: Job[];
  jobs: Job[];
  handleClearFilters: () => void;
}) => {
  return (
    <div className="mt-6 space-y-4">
      {filteredJobs.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No jobs match your filters</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={handleClearFilters}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};
