import React, { FC, useEffect, useMemo, useState } from "react";
import ComboBox from "./ComboBox";
import { Input } from "./ui/input";

import videoPlaceholderImg from "../assets/video-placeholder.png";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LanguageCode, Job, isJobStatusFinal } from "../types";
import { parseYoutubeUrl, createYoutubeUrl } from "../utils";
import { createJob, getJob } from "../api";

const POLL_INTERVAL_MS = 10000;
const CURRENT_JOB_ID_KEY = "currentJobId";
const DEFAULT_TARGET_LANGUAGE: LanguageCode = "es";

const languageOptions = [
  {
    value: "en",
    label: "🇬🇧 English",
  },
  {
    value: "es",
    label: "🇪🇸 Spanish",
  },
  {
    value: "de",
    label: "🇩🇪 German",
  },
  {
    value: "fr",
    label: "🇫🇷 French",
  },
  {
    value: "pl",
    label: "🇵🇱 Polish",
  },
  {
    value: "it",
    label: "🇮🇹 Italian",
  },
  {
    value: "pt",
    label: "🇵🇹 Portuguese",
  },
  {
    value: "hi",
    label: "🇮🇳 Hindi",
  },
];

const VideoTranslationComponent = () => {
  const [currentJobId, setCurrentJobId] = useLocalStorage(
    CURRENT_JOB_ID_KEY,
    ""
  );
  const [inputUrl, setInputUrl] = useState("");
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>(
    DEFAULT_TARGET_LANGUAGE
  );

  useEffect(() => {
    if (!currentJobId) {
      return;
    }
    const interval = setInterval(async () => {
      const job = await getJob(currentJobId);
      setCurrentJob(job);
      setInputUrl(job.input_url);
    }, POLL_INTERVAL_MS);
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
    <>
      <div className="mx-auto max-w-7xl px-4 sm:py-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mt-0 lg:mt-1 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl text-[#222222]">
            Video Translation
          </h2>
          <p className="w-[240px] lg:w-[480px] xl:w-[640px] mx-auto font-normal mt-3 lg:mt-5 max-w-xl text-base text-[#222222]">
            Effortlessly convert your videos with a single click, utilizing a
            realistic voice clone that replicates an authentic speaking manner!
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center border border-gray-300 rounded-md shadow-sm w-[240px] lg:w-[480px] xl:w-[640px] mt-4 lg:mt-0">
            <div className="p-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_35_86)">
                  <path
                    d="M23.5055 6.23876C23.2288 5.21063 22.4182 4.4002 21.3903 4.12335C19.5122 3.60938 11.9998 3.60938 11.9998 3.60938C11.9998 3.60938 4.48753 3.60938 2.60943 4.10376C1.60125 4.38043 0.770871 5.21081 0.4942 6.23876C0 8.11668 0 12.0113 0 12.0113C0 12.0113 0 15.9255 0.4942 17.7839C0.771054 18.8118 1.58148 19.6224 2.60961 19.8993C4.50731 20.4133 12 20.4133 12 20.4133C12 20.4133 19.5122 20.4133 21.3903 19.9189C22.4184 19.6422 23.2288 18.8316 23.5057 17.8037C23.9999 15.9255 23.9999 12.0311 23.9999 12.0311C23.9999 12.0311 24.0197 8.11668 23.5055 6.23876Z"
                    fill="#FF0000"
                  />
                  <path
                    d="M9.60791 15.6093L15.8549 12.0113L9.60791 8.41333V15.6093Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_35_86">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <Input
              type="text"
              name="videoUrl"
              placeholder="Paste YouTube link"
              className="focus:outline-none focus:ring-0 w-full"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              disabled={!!isJobPending}
            />

            {/* <input
              type="text"
              placeholder="Paste Youtube video link here..."
              className="form-input mt-1 block w-full px-3 py-2 bg-white border border-transparent rounded-r-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            /> */}
          </div>
          {youtubeUrl ? (
            <div className="m-4">
              <iframe
                className="rounded-md w-[240px] h-[180px] lg:w-[480px] lg:h-[360px] xl:w-[640px]"
                src={youtubeUrl}
              ></iframe>
            </div>
          ) : (
            <div className="m-4">
              <img
                src={videoPlaceholderImg}
                alt="Youtube Video"
                className="rounded-md w-[240px] h-[180px] lg:w-[480px] lg:h-[360px] xl:w-[640px]"
              />
            </div>
          )}
          {/* <div className="relative w-full mt-4"> */}
          <div className="flex flex-col items-center mb-4 w-[240px] lg:w-[480px] xl:w-[640px]">
            {/* <button className="absolute inset-y-0 left-0 flex items-center pl-3">
              {/* Icon can be placed here */}
            {/* </button> */}
            {/* <div className="flex"> */}
            <span className="self-start mt-1 lg:mt-2 mb-2 text-sm">
              Target Language
            </span>
            {/* <div className="self-start"> */}
            <ComboBox
              languageOptions={languageOptions}
              value={targetLanguage}
              setValue={setTargetLanguage}
            />
            {/* </div> */}
            {/* <select className="block w-full pl-10 pr-10 border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
              <option>English</option>
              {/* Add other language options here */}
            {/* </select>  */}
          </div>
          <p className="mt-1 mb-8 items-center w-[240px] lg:w-[480px] xl:w-[640px] text-sm text-gray-500">
            Note: We shorten all videos longer than 5 minutes for demonstration
            purposes.
          </p>
          <button
            type="button"
            className="mt-0 lg:mt-1 px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#5061FF] hover:bg-[#3748DE] focus:ring-gray-600 flex"
            onClick={handleCreateJob}
            disabled={!!isJobPending}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.94 1.48699C21.2339 0.604928 20.3949 -0.234267 19.5128 0.0597136L0.771531 6.30688C-0.280916 6.65766 -0.248291 8.15745 0.818325 8.46214L9.93326 11.0665L12.5375 20.1815C12.8423 21.2482 14.342 21.2808 14.6928 20.2283L20.94 1.48699ZM19.4707 2.32702L13.6225 19.8715L11.0232 10.7743L19.4707 2.32702ZM18.6728 1.52914L10.2255 9.97646L1.12838 7.37731L18.6728 1.52914Z"
                fill="white"
              />
            </svg>
            <span className="ml-2">Translate</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoTranslationComponent;
