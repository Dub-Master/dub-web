import React, { FC } from "react";
import LanguageSelect from "./LanguageSelect";

const Home: FC = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <input
        type="text"
        name="videoUrl"
        className="w-1/3 text-lg p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        placeholder="Enter Youtube Link"
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
