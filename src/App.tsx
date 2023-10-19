import React, { FC } from "react";
import Home from "./components/Home";
import "./App.css";

const App: FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col bg-blue-50">
      <div className="text-sm p-4 pr-8 text-right">
        <a href="#">Help</a>
      </div>
      <div className="flex flex-1">
        <Home />
      </div>
    </div>
  );
};

export default App;
