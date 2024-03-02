import { FC, JSX, useState, MouseEvent } from 'react';
import { ITask } from '@/shared/types';
import { Button, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { UniqueIdentifier } from '@dnd-kit/core';
import TextArea from 'antd/es/input/TextArea';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './KanbanCard.module.scss';
import { clsx } from 'clsx';

interface IKanbanCardProps {
  task: ITask;
  deleteTask: (arg: UniqueIdentifier) => void;
  editValue: (taskId: UniqueIdentifier, value: string) => void;
}

const KanbanCard: FC<IKanbanCardProps> = ({ task, deleteTask, editValue }): JSX.Element => {

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLTextAreaElement) return;
    setIsEditMode(!isEditMode);
  };

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    }
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Card style={{ width: '100%', ...style }}
          onClick={toggleEditMode}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
      className={clsx(styles.KanbanCard, isDragging && styles['KanbanCard--dragging'])}
          actions={[<Button type="text"
                            key={'delete'}
                            onClick={() => deleteTask(task.id)}>Delete task</Button>]}>
      {isEditMode ? (<>
        <TextArea
          autoFocus
          placeholder={task.content}
          value={task.content}
          onChange={(e) => editValue(task.id, e.target.value)}
          onBlur={() => setIsEditMode(false)}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
        <Button type="primary">Confirm</Button>
      </>) : (<Meta title={task.content}
                    style={{ textAlign: 'center' }}/>)}
    </Card>
  );
};
export default KanbanCard;
