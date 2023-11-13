import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import VideoTranslationComponent from "./VideoTranslationComponent";

const MainContent = () => {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center py-8">
        <VideoTranslationComponent />
        {/* <div className="text-center">
          <h1 className="text-xl font-semibold mb-4">Video Translation</h1>
          <p className="mb-4">
            Effortlessly convert your videos with a single click, utilizing a
            realistic voice clone that replicates an authentic speaking manner!
          </p>
          {/* Continue with the rest of the content */}
        {/* </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default MainContent;
