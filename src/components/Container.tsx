"use client";
import { useCallback, useMemo, useState } from "react";
import InputSection from "./input-section";
import SearchInput from "./Input/search-input";
import Button from "./button";
import toast from "react-hot-toast";
import {
  calculateNodePositions,
  generateTreeNodes,
  TreeNodeData,
} from "@/lib/generateTree";
import ReactFlow, {
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

function ContainerInner() {
  const [jsonData, setJsonData] = useState<string>("");
  const [nodes, setNodes, onNodesChange] = useNodesState<TreeNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const nodeTypes = useMemo(() => ({}), []);
  const edgeTypes = useMemo(() => ({}), []);

  const generateTree = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonData);
      const { nodes, edges } = generateTreeNodes(parsed);
      const positionedNodes = calculateNodePositions(nodes, edges);
      setNodes(positionedNodes);
      setEdges(edges);

      setTimeout(() => {
        fitView({ padding: 0.2, duration: 200 });
      }, 50);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid JSON");
    }
  }, [jsonData, setNodes, setEdges, fitView]);

  return (
    <main className="w-full gap-8 flex flex-col lg:flex-row">
      <div className="lg:w-2/5 w-full">
        <InputSection
          handleInputChange={(newValue) => setJsonData(newValue)}
          value={jsonData}
          handleGenrateTree={generateTree}
        />
      </div>
      <div className="lg:w-3/5 w-full">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex items-center">
            <label htmlFor="json-path" className="mr-2">
              Search by Path:
            </label>
            <SearchInput />
            <Button label="Search" classnames="ml-2" />
          </div>

          <div className="flex-1 w-full">
            <div className="h-[600px] border rounded-md">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}   
                edgeTypes={edgeTypes} 
                fitView
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Container() {
  return (
    <ReactFlowProvider>
      <ContainerInner />
    </ReactFlowProvider>
  );
}
