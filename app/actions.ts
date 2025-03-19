"use server";

import { supabase } from "@/lib/supabase";
import { Job } from "@/lib/types";

export type JobFormData = {
  title: string;
  area: string;
  company: string;
  link: string;
  seniority: string;
};

export async function getJobs() {
  try {
    const { data, error } = await supabase
      .from("tech_jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: processJobsData(data),
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}

function processJobsData(rows: any[]): Job[] {
  return rows.map((row) => ({
    id: row.id.toString(),
    title: row.title || "",
    area: row.area || "",
    company: row.company || "",
    link: row.link || "",
    seniority: row.seniority || "",
    date: row.created_at || new Date().toISOString(),
  }));
}
