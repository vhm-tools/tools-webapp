import { FC, useCallback, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, {
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
import { WorkflowNode } from './WorkflowNode';

import 'reactflow/dist/style.css';

const nodeTypes: NodeTypes = {
  workflowNode: WorkflowNode,
};

type Props = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
};

export const Workflow: FC<Props> = ({ nodes, setNodes }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => {
        console.log({ changes, nds });
        return applyNodeChanges(changes, nds);
      });
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData('application/reactflow');
      const data = event.dataTransfer.getData('workflownode/data');
      const { id, label } = JSON.parse(data);

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
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
    [reactFlowInstance, nodes, setNodes],
  );

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
          onInit={setReactFlowInstance}
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
