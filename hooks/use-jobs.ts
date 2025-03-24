import { Job } from "@/lib/types";
import { useEffect, useState } from "react";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [workMods, setWorkMods] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedWorkMods, setSelectedWorkMods] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function loadJobs() {
    try {
      setLoading(true);
      const result = await fetch("/api/jobs").then((res) => res.json());
      if (result.success) {
        setJobs(result.data || []);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    const uniqueValues: {
      areas: Set<string>;
      companies: Set<string>;
      wordMods: Set<string>;
    } = {
      areas: new Set(),
      companies: new Set(),
      wordMods: new Set(),
    };

    jobs.forEach((job) => {
      if (job.area) uniqueValues.areas.add(job.area);
      if (job.company) uniqueValues.companies.add(job.company);
      if (job.workMod) uniqueValues.wordMods.add(job.workMod);
    });

    setAreas([...uniqueValues.areas]);
    setCompanies([...uniqueValues.companies]);
    setWorkMods([...uniqueValues.wordMods]);
  }, [jobs]);

  useEffect(() => {
    let result = [...jobs];

    if (selectedAreas.length > 0) {
      result = result.filter((job) => selectedAreas.includes(job.area));
    }

    if (selectedCompanies.length > 0) {
      result = result.filter((job) => selectedCompanies.includes(job.company));
    }

    if (selectedWorkMods.length > 0) {
      result = result.filter((job) => selectedWorkMods.includes(job.workMod));
    }

    if (dateFilter !== "all") {
      const now = new Date();
      const daysAgo = dateFilter === "last7" ? 7 : 30;
      const cutoffDate = new Date(now.setDate(now.getDate() - daysAgo));

      result = result.filter((job) => new Date(job.date) >= cutoffDate);
    }

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
    setSelectedWorkMods,
    setDateFilter,
    workMods,
    selectedWorkMods,
  };

  const handleClearFilters = () => {
    setSelectedAreas([]);
    setSelectedCompanies([]);
    setSelectedWorkMods([]);
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
    loading,
  };
};
