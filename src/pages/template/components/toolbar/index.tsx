import { FC } from 'react';
import { Action } from './Action';
import { Divider } from '@/components';
import { Channel } from './Channel';

const actions = [
  {
    id: 'delay',
    name: 'Delay',
  },
];

const channels = [
  {
    id: 'email',
    name: 'Email',
  },
  {
    id: 'sms',
    name: 'SMS',
  },
  {
    id: 'push',
    name: 'Push',
  },
];

export const Toolbar: FC = () => {
  const onDragStart = (
    event: any,
    id: string,
    label: string,
    nodeType = 'workflowNode',
  ) => {
    if (!event.dataTransfer) {
      return;
    }

    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData(
      'workflownode/data',
      JSON.stringify({ id, label }),
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      <div>
        <div className="text-xl font-bold text-navy-700 dark:text-white mb-3">
          Actions:
        </div>
        <div className="flex flex-col text-center">
          {actions.map((action) => (
            <Action
              key={action.id}
              name={action.name}
              onDragStart={(e) => onDragStart(e, action.id, action.name)}
              draggable
            />
          ))}
        </div>
      </div>
      <Divider />
      <div>
        <div className="text-xl font-bold text-navy-700 dark:text-white mb-3">
          Channels:
        </div>
        <div className="flex flex-col text-center">
          {channels.map((channel) => (
            <Channel
              key={channel.id}
              name={channel.name}
              onDragStart={(e) => onDragStart(e, channel.id, channel.name)}
              draggable
            />
          ))}
        </div>
      </div>
    </div>
  );
};
