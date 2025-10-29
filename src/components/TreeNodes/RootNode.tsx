import React from "react";
import { Handle, Position } from "reactflow";
import { TreeNodeData } from "@/lib/generateTree";

export default function RootNode({ data }: { data: TreeNodeData }) {
  const isHighlighted = data.isHighlighted;

  return (
    <div
      className={`px-8 py-4 rounded-2xl shadow-lg border-0 transition-all min-w-[120px] outline-none focus:outline-none ${
        isHighlighted
          ? "bg-red-500 scale-110"
          : "bg-[#7c93c3]"
      }`}
      title={`Path: ${data.path}\nType: Root`}
    >
      <div className="text-white font-semibold text-lg">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-gray-400!"
      />
    </div>
  );
}
