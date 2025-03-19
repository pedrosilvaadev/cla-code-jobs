"use client";

import { SearchBar } from "@/components/search-bar";
import type { Job } from "@/lib/types";
import { useMobile } from "@/hooks/use-mobile";
import { useJobs } from "@/hooks/use-jobs";
import { Filter } from "./filter";
import { JobList } from "./job.list";

export function JobBoard({ initialJobs }: { initialJobs: Job[] }) {
  const isMobile = useMobile();
  const {
    filterProps,
    searchQuery,
    setSearchQuery,
    filteredJobs,
    jobs,
    handleClearFilters,
  } = useJobs({ initialJobs });

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Filter isMobile={isMobile} filterProps={filterProps} />
      <div className="flex-1">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <JobList
          filteredJobs={filteredJobs}
          jobs={jobs}
          handleClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
}
