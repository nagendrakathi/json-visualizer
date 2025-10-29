"use client";
import React from "react";
import { useReactFlow } from "reactflow";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export default function ZoomControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10">
      <button
        onClick={() => zoomIn()}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
        title="Zoom In"
      >
        <ZoomIn size={20} />
      </button>
      <button
        onClick={() => zoomOut()}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
        title="Zoom Out"
      >
        <ZoomOut size={20} />
      </button>
      <button
        onClick={() => fitView({ padding: 0.2, duration: 300 })}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
        title="Fit View"
      >
        <Maximize2 size={20} />
      </button>
    </div>
  );
}
