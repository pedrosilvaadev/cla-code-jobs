import { getJobs } from "@/app/actions";
import { Job } from "@/lib/types";
import { NextApiRequest, NextApiResponse } from "next";

interface GetJobsResponse {
  success: boolean;
  data?: Job[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { success, data, error }: GetJobsResponse = await getJobs();

  if (success) {
    res.status(200).json({
      success: true,
      data,
    });
  } else {
    res.status(500).json({ error });
  }
}
