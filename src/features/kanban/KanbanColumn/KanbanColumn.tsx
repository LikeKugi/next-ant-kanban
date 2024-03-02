import { DetailedHTMLProps, FC, HTMLAttributes, JSX } from 'react';
import styles from './KanbanColumn.module.scss';
import { clsx } from 'clsx';
import ColumnContainer from '@/shared/ui/ColumnContainer/ColumnContainer';
import { IColumn } from '@/shared/types';
import KanbanTitle from '@/entities/kanban/KanbanTitle/KanbanTitle';
import KanbanAddTask from '@/features/kanban/KanbanAddTask/KanbanAddTask';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


interface IKanbanColumnProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  column: IColumn;
  deleteHandler?: (arg: UniqueIdentifier) => void;
  editHandler: (id: UniqueIdentifier, arg: string) => void;
  createTaskHandler: (columnId: UniqueIdentifier) => void;
}

const KanbanColumn: FC<IKanbanColumnProps> = ({
                                                children,
                                                className,
                                                column,
                                                deleteHandler,
                                                editHandler,
                                                createTaskHandler,
                                                ...other
                                              }): JSX.Element => {

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    }
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const editTitle = (title: string) => {
    editHandler(column.id, title);
  };

  return (
    <ColumnContainer className={clsx(className, styles.KanbanColumn, isDragging && styles['KanbanColumn--dragging'])} {...other}
                     ref={setNodeRef}
                     style={style} {...attributes} {...listeners}>
      <KanbanTitle title={column.title}
                   deleteHandler={deleteHandler ? () => deleteHandler(column.id) : undefined}
                   editHandler={editTitle}/>
      <KanbanAddTask onClick={() => createTaskHandler(column.id)}/>
      {children}
    </ColumnContainer>
  );
};
export default KanbanColumn;
