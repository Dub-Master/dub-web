import React, { FC } from "react";
// import Home from "./components/Home";
import MainContent from "./components/MainContent";
import "./App.css";

const App: FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      {/* <Home /> */}
      <MainContent />
    </div>
  );
};

export default App;
