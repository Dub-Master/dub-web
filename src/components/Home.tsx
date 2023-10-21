import React, { FC, useEffect, useMemo, useState } from "react";
import LanguageSelect from "./LanguageSelect";
import videoPlaceholderImg from "../assets/video-placeholder.png";
import { useLocalStorage } from "../hooks/useLocalStorage";

const API_URL = process.env.REACT_APP_API_URL;

type JobStatus = "created" | "running" | "completed" | "failed";

type Job = {
  id: string;
  input_url: string;
  output_url: string;
  status: JobStatus;
};

function isJobStatusFinal(status: JobStatus) {
  return status === "completed" || status === "failed";
}

async function getJob(jobId: string) {
  const resp = await fetch(`${API_URL}/jobs/${jobId}`);
  const data = await resp.json();
  return data as Job;
}

async function createJob(job: Job) {
  const resp = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  const data = await resp.json();
  return data as Job;
}

// YouTube URL Format: https://www.youtube.com/watch?v=4idQbwsvtUo
function getYoutubeId(url: string) {
  const urlRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/gim;
  const isValid = urlRegex.test(url);
  if (isValid) {
    const youtubeId = url.split("v=")[1];
    return youtubeId;
  }
  return "";
}

const Home: FC = () => {
  const [jobId, setJobId] = useLocalStorage("jobId", "");
  const [videoUrl, setVideoUrl] = useState("");
  const [currentJob, setCurrentJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!jobId) {
      return;
    }
    const interval = setInterval(async () => {
      const job = await getJob(jobId);
      setCurrentJob(job);
      setVideoUrl(job.input_url);
    }, 10000);
    return () => clearInterval(interval);
  }, [jobId]);

  const youtubeId = useMemo(() => {
    return getYoutubeId(videoUrl);
  }, [videoUrl]);

  const youtubeUrl = useMemo(() => {
    if (!youtubeId) {
      return "";
    }
    return `https://www.youtube.com/embed/${youtubeId}`;
  }, [youtubeId]);

  const handleCreateJob = async () => {
    const inputJob: Job = {
      id: "",
      input_url: videoUrl,
      output_url: "",
      status: "created",
    };
    const job = await createJob(inputJob);
    setJobId(job.id);
  };

  const isJobPending = currentJob && !isJobStatusFinal(currentJob.status);

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      {youtubeUrl && (
        <div className="m-4">
          <iframe width="640" height="360" src={youtubeUrl}></iframe>
        </div>
      )}
      {!youtubeUrl && (
        <div className="m-4">
          <img
            src={videoPlaceholderImg}
            alt="Youtube Video"
            className="rounded-md"
            width="640"
            height="360"
          />
        </div>
      )}
      <input
        type="text"
        name="videoUrl"
        className="w-1/3 text-lg p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        placeholder="Enter Youtube Link"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        disabled={!!isJobPending}
      />
      <LanguageSelect />
      <button
        type="button"
        className="mt-4 rounded-md bg-white px-3.5 py-2.5 text-lg font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={handleCreateJob}
        disabled={!!isJobPending}
      >
        {isJobPending ? "Processing.." : "Translate"}
      </button>
    </div>
  );
};

export default Home;
