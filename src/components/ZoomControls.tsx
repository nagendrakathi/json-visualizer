"use client";
import React from "react";
import { useReactFlow } from "reactflow";
import { useTheme } from "next-themes";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export default function ZoomControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div 
      className="absolute bottom-4 right-4 flex flex-col gap-2 rounded-lg shadow-lg p-2 z-10"
      style={{
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
      }}
    >
      <button
        onClick={() => zoomIn()}
        className="p-2 rounded transition"
        style={{
          color: isDark ? '#e5e7eb' : '#374151',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        title="Zoom In"
      >
        <ZoomIn size={20} />
      </button>
      <button
        onClick={() => zoomOut()}
        className="p-2 rounded transition"
        style={{
          color: isDark ? '#e5e7eb' : '#374151',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        title="Zoom Out"
      >
        <ZoomOut size={20} />
      </button>
      <button
        onClick={() => fitView({ padding: 0.2, duration: 300 })}
        className="p-2 rounded transition"
        style={{
          color: isDark ? '#e5e7eb' : '#374151',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        title="Fit View"
      >
        <Maximize2 size={20} />
      </button>
    </div>
  );
}
