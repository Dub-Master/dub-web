import React, { useState, FC } from "react";
import LanguageSelect from "./LanguageSelect";
import env from "react-dotenv";
type PeopleType = {
  id: number;
  name: string;
};

const Home: FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [language, setLanguage] = useState<PeopleType>({
    id: 2,
    name: "Spanish",
  });

  const submitJob = (videoUrl: string) => {
    console.log("submitting job");

    console.log({ api: env.API_URL });
    const url = new URL(`${env.API_URL}/jobs`);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_url: videoUrl }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setVideoUrl(event.target.value);
  }

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <input
        type="text"
        name="videoUrl"
        onChange={(e) => handleChange(e)}
        className="w-1/3 text-lg p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        placeholder="Enter Youtube Link"
      />
      <LanguageSelect Language={language} setLanguage={setLanguage} />
      <button
        onClick={() => submitJob(videoUrl)}
        type="button"
        className="mt-4 rounded-md bg-white px-3.5 py-2.5 text-lg font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Translate
      </button>
    </div>
  );
};

export default Home;
