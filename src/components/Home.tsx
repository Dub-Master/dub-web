import React, { FC, useMemo, useState } from "react";
import LanguageSelect from "./LanguageSelect";
import videoPlaceholderImg from "../assets/video-placeholder.png";

const Home: FC = () => {
  const [videoUrl, setVideoUrl] = useState("");

  // YouTube URL Format: https://www.youtube.com/watch?v=4idQbwsvtUo
  const getYoutubeId = (url: string) => {
    const urlRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/gim;
    const isValid = urlRegex.test(url);
    if (isValid) {
      const youtubeId = url.split("v=")[1];
      return youtubeId;
    }
    return "";
  };

  const youtubeId = useMemo(() => {
    return getYoutubeId(videoUrl);
  }, [videoUrl]);

  const youtubeUrl = useMemo(() => {
    if (!youtubeId) {
      return "";
    }
    return `https://www.youtube.com/embed/${youtubeId}`;
  }, [youtubeId]);

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
      />

      <LanguageSelect />
      <button
        type="button"
        className="mt-4 rounded-md bg-white px-3.5 py-2.5 text-lg font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Translate
      </button>
    </div>
  );
};

export default Home;
