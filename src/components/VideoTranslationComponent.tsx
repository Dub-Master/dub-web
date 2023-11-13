import React from "react";

const VideoTranslationComponent = () => {
  return (
    <div className="bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Video Translation</h1>
        <p className="mb-6">
          Effortlessly convert your videos with a single click, utilizing a
          realistic voice clone that replicates an authentic speaking manner!
        </p>
        <div className="flex flex-col items-center mb-4">
          <input
            type="text"
            placeholder="Paste Youtube video link here..."
            className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
          <div className="relative w-full mt-4">
            <button className="absolute inset-y-0 left-0 flex items-center pl-3">
              {/* Icon can be placed here */}
            </button>
            <select className="block w-full pl-10 pr-10 border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
              <option>English</option>
              {/* Add other language options here */}
            </select>
          </div>
          <button className="mt-4 px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Translate video
          </button>
        </div>
        {/* Footer Links */}
        <div className="flex justify-between items-center mt-8">
          <div>{/* Company Links */}</div>
          <div>{/* Social Links */}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoTranslationComponent;
