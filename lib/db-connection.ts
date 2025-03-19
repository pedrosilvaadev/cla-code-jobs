import { createClient } from "@supabase/supabase-js";
import type { Job } from "./types";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from("tech_jobs")
    .select("id, title, area, company, link, seniority, created_at");

  if (error) {
    console.error(error);
    throw new Error(`Error fetching jobs from Supabase: ${error.message}`);
  }

  return processJobsData(data);
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
