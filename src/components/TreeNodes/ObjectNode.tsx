import React from "react";
import { Handle, Position } from "reactflow";
import { TreeNodeData } from "@/lib/generateTree";

export default function ObjectNode({ data }: { data: TreeNodeData }) {
  const isHighlighted = data.isHighlighted;

  return (
    <div
      className={`px-6 py-3 rounded-2xl shadow-md border-0 transition-all min-w-[100px] outline-none focus:outline-none ${
        isHighlighted
          ? "bg-red-500 scale-110"
          : "bg-[#66b3a3]"
      }`}
      title={`Path: ${data.path}\nType: Object`}
    >
      <Handle type="target" position={Position.Top} className="bg-gray-400!" />
      <div className="text-white font-semibold text-base">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-gray-400!"
      />
    </div>
  );
}
