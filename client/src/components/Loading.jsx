import React from "react";
import gif from "../img/gif.gif";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-opacity-80 z-50">
      <img
        src={gif}
        alt="loading"
        className="w-60 max-w-full sm:w-48 animate-pulse"
      />
      <h1 className="text-lg font-semibold text-gray-800 mt-4">Loading...</h1>
    </div>
  );
}
