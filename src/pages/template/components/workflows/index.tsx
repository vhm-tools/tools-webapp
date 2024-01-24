import { FC, useEffect, useCallback, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, {
  useReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  NodeTypes,
  PanOnScrollMode,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { PiPlugsConnectedThin } from 'react-icons/pi';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { WorkflowNode } from './WorkflowNode';

import 'reactflow/dist/style.css';

const nodeTypes: NodeTypes = {
  workflowNode: WorkflowNode,
};

const initialNodes: Node[] = [
  {
    id: uuidv4(),
    type: 'workflowNode',
    position: { x: 0, y: 0 },
    data: {
      id: 'trigger',
      label: 'Workflow Trigger',
      icon: <AiOutlineThunderbolt size={18} />,
    },
  },
];

const workflowStorageKey = 'workflows';

type Props = {
  defaultEdges?: Edge[];
  defaultNodes?: Node[];
  flows?: string;
  rfInstance?: any;
  setRfInstance?: React.Dispatch<React.SetStateAction<any>>;
  onChange?: (nodes: Node[], edges: Edge[]) => void;
};

export const Workflow: FC<Props> = ({
  defaultEdges = [],
  defaultNodes = [],
  flows = '',
  rfInstance,
  setRfInstance,
  onChange,
}) => {
  const reactFlowWrapper = useRef(null);
  const [edges, setEdges] = useState<Edge[]>(defaultEdges);
  const [nodes, setNodes] = useState<Node[]>([
    ...initialNodes,
    ...defaultNodes,
  ]);

  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(workflowStorageKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = () => {
      const flow = JSON.parse(flows);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes);
        setEdges(flow.edges);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport, flows]);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!rfInstance) return;

      const type = event.dataTransfer.getData('application/reactflow');
      const data = event.dataTransfer.getData('workflownode/data');
      const { id, label } = JSON.parse(data);

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = rfInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: {
          id,
          label,
          icon: <PiPlugsConnectedThin size={16} />,
        },
      };

      const newEdge: Edge = {
        id: uuidv4(),
        source: nodes[nodes.length - 1].id,
        target: newNode.id,
      };

      setEdges((eds) => [...eds, newEdge]);
      setNodes((nds) => [...nds, newNode]);
    },
    [rfInstance, nodes, setNodes],
  );

  // Save workflow to localStorage
  useEffect(() => {
    if (rfInstance?.toObject()) {
      onSave();
    }
  }, [onSave, rfInstance]);

  // Restore workflow from flows param
  useEffect(() => {
    flows && onRestore();
  }, [flows, onRestore]);

  // Handle change event from nodes and edges
  useEffect(() => {
    if (onChange) {
      onChange(nodes, edges);
    }
  }, [nodes, edges, onChange]);

  return (
    <div className="bg-gray-200 w-full h-screen dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onConnect={onConnect}
          onInit={setRfInstance}
          panOnScrollMode={PanOnScrollMode.Vertical}
          fitView
        >
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
          <Controls />
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
        </ReactFlow>
      </div>
    </div>
  );
};
