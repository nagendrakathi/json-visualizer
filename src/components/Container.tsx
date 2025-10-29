"use client";
import { useCallback, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import InputSection from "./input-section";
import SearchInput from "./Input/search-input";
import Button from "./button";
import toast from "react-hot-toast";
import {
  calculateNodePositions,
  generateTreeNodes,
  TreeNodeData,
  searchNodeByPath,
  findNodeByPath,
} from "@/lib/generateTree";
import ReactFlow, {
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import ZoomControls from "./ZoomControls";
import CustomNode from "./TreeNodes/CustomNode";

function ContainerInner() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  
  const [jsonData, setJsonData] = useState<string>("");
  const [searchPath, setSearchPath] = useState<string>("");
  const [searchMessage, setSearchMessage] = useState<string>("");
  const [jsonError, setJsonError] = useState<string>("");
  const [nodes, setNodes, onNodesChange] = useNodesState<TreeNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView, setCenter } = useReactFlow();

  const generateTree = useCallback(() => {
    try {
      setJsonError("");
      const parsed = JSON.parse(jsonData);
      const { nodes, edges } = generateTreeNodes(parsed);
      const positionedNodes = calculateNodePositions(nodes, edges);
      setNodes(positionedNodes);
      setEdges(edges);

      setTimeout(() => {
        fitView({ padding: 0.2, duration: 200 });
      }, 50);

      toast.success("Tree generated successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Invalid JSON format";
      setJsonError(errorMessage);
      toast.error(errorMessage);
    }
  }, [jsonData, setNodes, setEdges, fitView]);

  const handleSearch = useCallback(() => {
    if (!searchPath.trim()) {
      toast.error("Please enter a search path");
      return;
    }

    if (nodes.length === 0) {
      toast.error("Please generate a tree first");
      return;
    }

    const highlightedNodes = searchNodeByPath(nodes, searchPath);
    const foundNode = findNodeByPath(nodes, searchPath);

    setNodes(highlightedNodes);

    if (foundNode) {
      setSearchMessage("Match found!");
      toast.success("Match found!");

      setTimeout(() => {
        setCenter(foundNode.position.x, foundNode.position.y, {
          zoom: 1.2,
          duration: 500,
        });
      }, 100);
    } else {
      setSearchMessage("No match found");
      toast.error("No match found");
    }
  }, [searchPath, nodes, setNodes, setCenter]);

  const handleClearSearch = useCallback(() => {
    setSearchPath("");
    setSearchMessage("");
    
    const clearedNodes = nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isHighlighted: false,
      },
    }));
    setNodes(clearedNodes);
  }, [nodes, setNodes]);

  return (
    <main className="w-full gap-8 flex flex-col lg:flex-row">
      <div className="lg:w-2/5 w-full">
        <InputSection
          handleInputChange={(newValue) => {
            setJsonData(newValue);
            setJsonError("");
          }}
          value={jsonData}
          handleGenrateTree={generateTree}
          error={jsonError}
        />
      </div>
      <div className="lg:w-3/5 w-full">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex items-center gap-2 flex-wrap">
            <label htmlFor="json-path" className="font-medium">
              Search by Path:
            </label>
            <SearchInput
              value={searchPath}
              onChange={setSearchPath}
              onEnter={handleSearch}
            />
            <Button label="Search" classnames="ml-2" handleClick={handleSearch} />
            <Button
              label="Clear"
              classnames="bg-gray-500 hover:bg-gray-600"
              handleClick={handleClearSearch}
            />
            {searchMessage && (
              <span
                className={`ml-2 text-sm font-medium ${
                  searchMessage === "Match found!"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {searchMessage}
              </span>
            )}
          </div>
          

          <div className="flex-1 w-full">
            <div className="h-[600px] border-2 border-gray-300 dark:border-gray-700 rounded-lg relative bg-gray-50 dark:bg-gray-900">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-left"
                style={{
                  backgroundColor: isDark ? '#1f2937' : '#f9fafb',
                }}
              >
                <Background color={isDark ? '#4b5563' : '#d1d5db'} />
                <Controls color={isDark ? '#4b5563' : '#d1d5db'}/>
                <MiniMap
                color={isDark ? '#4b5563' : '#d1d5db'}
                  nodeColor={(node) => {
                    const nodeData = node.data as TreeNodeData;
                    if (nodeData.isHighlighted) return "#EF4444";
                    switch (nodeData.nodeType) {
                      case "root":
                        return "#7c93c3";
                      case "object":
                        return "#9333ea";
                      case "array":
                        return "#10b981";
                      case "primitive":
                        return "#f59e0b";
                      default:
                        return "#gray";
                    }
                  }}
                  className="bg-white! dark:bg-gray-800!"
                />
                <ZoomControls/>
              </ReactFlow>
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
