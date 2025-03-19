import { Job } from "@/lib/types";
import { useEffect, useState } from "react";

export const useJobs = ({ initialJobs }: { initialJobs: Job[] }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);
  const [areas, setAreas] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Extract unique areas and companies
    const uniqueAreas = Array.from(new Set(jobs.map((job) => job.area)));
    const uniqueCompanies = Array.from(new Set(jobs.map((job) => job.company)));

    setAreas(uniqueAreas);
    setCompanies(uniqueCompanies);
  }, [jobs]);

  useEffect(() => {
    let result = [...jobs];

    // Filter by area
    if (selectedAreas.length > 0) {
      result = result.filter((job) => selectedAreas.includes(job.area));
    }

    // Filter by company
    if (selectedCompanies.length > 0) {
      result = result.filter((job) => selectedCompanies.includes(job.company));
    }

    // Filter by date
    if (dateFilter !== "all") {
      const now = new Date();
      const daysAgo = dateFilter === "last7" ? 7 : 30;
      const cutoffDate = new Date(now.setDate(now.getDate() - daysAgo));

      result = result.filter((job) => new Date(job.date) >= cutoffDate);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.area.toLowerCase().includes(query)
      );
    }

    setFilteredJobs(result);
  }, [jobs, selectedAreas, selectedCompanies, dateFilter, searchQuery]);

  const filterProps = {
    areas,
    companies,
    selectedAreas,
    selectedCompanies,
    dateFilter,
    setSelectedAreas,
    setSelectedCompanies,
    setDateFilter,
  };

  const handleClearFilters = () => {
    setSelectedAreas([]);
    setSelectedCompanies([]);
    setDateFilter("all");
    setSearchQuery("");
  };
  return {
    filterProps,
    searchQuery,
    setSearchQuery,
    filteredJobs,
    jobs,
    handleClearFilters,
  };
};
