import { Job } from "./types";

const API_URL = process.env.REACT_APP_API_URL || 'API_URL_PLACEHOLDER';

export async function getJob(id: string): Promise<Job> {
  const url = `${API_URL}/jobs/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data as Job;
}

export async function createJob(job: Job): Promise<string> {
  const url = `${API_URL}/jobs`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  const data = await resp.json();
  return (data as Job).id;
}
