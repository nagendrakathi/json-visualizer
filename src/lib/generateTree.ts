import { Node, Edge } from 'reactflow';
import { hierarchy, tree } from 'd3-hierarchy';

export interface TreeNodeData {
  label: string;
  nodeType: 'root' | 'object' | 'array' | 'primitive';
  path: string;
  isHighlighted: boolean;
  value?: unknown;
  isPrimitiveValue?: boolean; // To distinguish between key and value nodes
}

export const NODE_COLORS = {
  root: '#7c93c3',      // Blue/purple for root
  object: '#9333ea',    // Purple for objects
  array: '#10b981',     // Green for arrays
  primitive: '#f59e0b', // Orange for primitives
  highlighted: '#EF4444',
};

const HORIZONTAL_SPACING = 180;
const VERTICAL_SPACING = 150;

export const generateTreeNodes = (
  jsonData: unknown,
  rootKey: string | null = null,
  rootPath: string = '$'
): { nodes: Node<TreeNodeData>[]; edges: Edge[] } => {
  const nodes: Node<TreeNodeData>[] = [];
  const edges: Edge[] = [];
  let nodeCounter = 0;

  const createNode = (
    value: unknown,
    key: string | null,
    currentPath: string,
    parentId: string | null,
    isRootLevel: boolean = false
  ): string => {
    const nodeId = `node-${nodeCounter++}`;
    let nodeType: TreeNodeData['nodeType'];
    let label: string;

    if (value === null || typeof value !== 'object') {
      nodeType = 'primitive';
      label = key !== null ? key : 'value';
    } else if (Array.isArray(value)) {
      nodeType = 'array';
      label = key !== null ? key : '[]';
    } else {
      nodeType = isRootLevel ? 'root' : 'object';
      label = key !== null ? key : (isRootLevel ? 'root' : '{}');
    }

    nodes.push({
      id: nodeId,
      type: 'custom',
      position: { x: 0, y: 0 },
      data: {
        label,
        nodeType,
        path: currentPath,
        isHighlighted: false,
        value,
        isPrimitiveValue: false, // This is a key node, not a value
      },
    });

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#9ca3af', strokeWidth: 2 },
      });
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const childPath = `${currentPath}[${index}]`;
        createNode(item, `[${index}]`, childPath, nodeId);
      });
    } else if (value !== null && typeof value === 'object') {
      const objValue = value as Record<string, unknown>;
      Object.keys(objValue).forEach((k) => {
        const childPath = `${currentPath}.${k}`;
        createNode(objValue[k], k, childPath, nodeId);
      });
    } else if (nodeType === 'primitive') {
    }

    return nodeId;
  };

  createNode(jsonData, rootKey, rootPath, null, true);

  return { nodes, edges };
};

export const calculateNodePositions = (
  nodes: Node<TreeNodeData>[],
  edges: Edge[]
): Node<TreeNodeData>[] => {
  if (nodes.length === 0) return nodes;

  const childrenMap: Map<string, string[]> = new Map();
  const parentMap: Map<string, string> = new Map();

  edges.forEach(edge => {
    if (!childrenMap.has(edge.source)) {
      childrenMap.set(edge.source, []);
    }
    childrenMap.get(edge.source)!.push(edge.target);
    parentMap.set(edge.target, edge.source);
  });

  const rootNode = nodes.find(n => !parentMap.has(n.id));
  if (!rootNode) return nodes;

  interface TreeNode {
    id: string;
    children?: TreeNode[];
  }

  const buildHierarchy = (nodeId: string): TreeNode => {
    const children = childrenMap.get(nodeId) || [];
    if (children.length === 0) {
      return { id: nodeId };
    }
    return {
      id: nodeId,
      children: children.map(childId => buildHierarchy(childId))
    };
  };

  const hierarchyData = buildHierarchy(rootNode.id);

  const root = hierarchy(hierarchyData);
  const treeLayout = tree<TreeNode>()
    .nodeSize([HORIZONTAL_SPACING, VERTICAL_SPACING])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));

  treeLayout(root);

  const positionMap = new Map<string, { x: number; y: number }>();
  root.each(node => {
    positionMap.set(node.data.id, { 
      x: node.x ?? 0, 
      y: node.y ?? 0 
    });
  });

  const positionedNodes = nodes.map(node => {
    const pos = positionMap.get(node.id) || { x: 0, y: 0 };
    return {
      ...node,
      position: pos,
    };
  });

  return positionedNodes;
};

export const searchNodeByPath = (
  nodes: Node<TreeNodeData>[],
  searchPath: string
): Node<TreeNodeData>[] => {
  let normalizedSearch = searchPath.trim();
  if (normalizedSearch.startsWith('$.')) {
    normalizedSearch = normalizedSearch.substring(2);
  } else if (normalizedSearch === '$') {
    normalizedSearch = '$';
  } else if (normalizedSearch.startsWith('$')) {
    normalizedSearch = normalizedSearch.substring(1);
  }
  
  return nodes.map(node => {
    let nodePath = node.data.path;
    if (nodePath.startsWith('$.')) {
      nodePath = nodePath.substring(2);
    }
    
    const isMatch = node.data.path === searchPath || 
                    nodePath === normalizedSearch ||
                    node.data.path.endsWith(`.${normalizedSearch}`) ||
                    node.data.path.includes(`[${normalizedSearch}]`) ||
                    (searchPath === '$' && node.data.path === '$');

    return {
      ...node,
      data: {
        ...node.data,
        isHighlighted: isMatch,
      },
    };
  });
};

export const findNodeByPath = (
  nodes: Node<TreeNodeData>[],
  searchPath: string
): Node<TreeNodeData> | null => {
  let normalizedSearch = searchPath.trim();
  if (normalizedSearch.startsWith('$.')) {
    normalizedSearch = normalizedSearch.substring(2);
  } else if (normalizedSearch === '$') {
    return nodes.find(node => node.data.path === '$') || null;
  } else if (normalizedSearch.startsWith('$')) {
    normalizedSearch = normalizedSearch.substring(1);
  }
  
  return nodes.find(node => {
    let nodePath = node.data.path;
    if (nodePath.startsWith('$.')) {
      nodePath = nodePath.substring(2);
    }
    
    return node.data.path === searchPath || 
           nodePath === normalizedSearch ||
           node.data.path.endsWith(`.${normalizedSearch}`);
  }) || null;
};
