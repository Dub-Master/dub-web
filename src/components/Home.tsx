import React, { FC, useEffect, useMemo, useState } from "react";
import LanguageSelect from "./LanguageSelect";
import videoPlaceholderImg from "../assets/video-placeholder.png";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LanguageCode, Job, isJobStatusFinal } from "../types";
import { parseYoutubeUrl, createYoutubeUrl } from "../utils";
import { createJob, getJob } from "../api";

const POLL_INTERVAL_MS = 10000;
const CURRENT_JOB_ID_KEY = "currentJobId";
const DEFAULT_TARGET_LANGUAGE: LanguageCode = "es";

const Home: FC = () => {
  const [currentJobId, setCurrentJobId] = useLocalStorage(
    CURRENT_JOB_ID_KEY,
    "",
  );
  const [inputUrl, setInputUrl] = useState("");
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>(
    DEFAULT_TARGET_LANGUAGE,
  );

  useEffect(() => {
    const refreshJob = async () => {
      if (!currentJobId) {
        return;
      }
      const job = await getJob(currentJobId);
      setCurrentJob(job);
      if (job.input_url) {
        setInputUrl(job.input_url);
      }
    };
    refreshJob();
    const interval = setInterval(refreshJob, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [currentJobId]);

  const youtubeId = useMemo(() => {
    return parseYoutubeUrl(inputUrl);
  }, [inputUrl]);

  const youtubeUrl = useMemo(() => {
    if (!youtubeId) {
      return "";
    }
    return createYoutubeUrl(youtubeId);
  }, [youtubeId]);

  const handleCreateJob = async () => {
    const inputJob: Job = {
      id: "",
      input_url: inputUrl,
      target_language: targetLanguage,
      output_url: "",
      status: "created",
    };
    const id = await createJob(inputJob);
    setCurrentJobId(id);
  };

  const isJobPending = currentJob && !isJobStatusFinal(currentJob.status);

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      {youtubeUrl ? (
        <div className="m-4">
          <iframe width="640" height="360" src={youtubeUrl}></iframe>
        </div>
      ) : (
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
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        disabled={!!isJobPending}
      />
      <LanguageSelect value={targetLanguage} onSelect={setTargetLanguage} />
      <button
        type="button"
        className="mt-4 rounded-md bg-white px-3.5 py-2.5 text-lg font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={handleCreateJob}
        disabled={!!isJobPending}
      >
        {isJobPending ? "Processing.." : "Translate"}
      </button>

      {currentJob && currentJob.output_url && (
        <div className="m-4 text-center">
          <video src={currentJob.output_url} width="640" height="360" controls>
            Your browser does not support the video tag.
          </video>
          <div className="mt-4">
            <a href={currentJob.output_url} target="_blank" rel="noreferrer">
              Download Translated Video &gt;&gt;
            </a>
          </div>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-500">
        Note: We shorten all videos longer than 5 minutes for demonstration
        purposes.
      </p>
    </div>
  );
};

export default Home;
