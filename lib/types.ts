export interface Job {
  id: string;
  title: string;
  area: string;
  company: string;
  date: string;
  link: string;
  seniority: string;
  workMod: string;
}

export interface FilterSidebarProps {
  areas: string[];
  companies: string[];
  workMods: string[];
  selectedAreas: string[];
  selectedCompanies: string[];
  dateFilter: string;
  setSelectedAreas: (areas: string[]) => void;
  setSelectedCompanies: (companies: string[]) => void;
  setDateFilter: (filter: string) => void;
  selectedWorkMods: string[];
  setSelectedWorkMods: (workMod: string[]) => void;
}
