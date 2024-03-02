'use client';

import { JSX, useState } from 'react';
import { Flex } from 'antd';
import styles from './KanbanBoard.module.scss';
import KanbanColumn from '@/features/kanban/KanbanColumn/KanbanColumn';
import KanbanAddColumn from '@/features/kanban/KanbanAddColumn/KanbanAddColumn';
import { IColumn, ITask } from '@/shared/types';
import { generateUniqueNumber } from '@/shared/utils/generateUniqueNumber';
import ColumnContainer from '@/shared/ui/ColumnContainer/ColumnContainer';
import {
  DndContext,
  DragEndEvent, DragOverEvent,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { initialColumns, initialTasks } from '@/shared/constants/default';
import KanbanCard from '@/entities/kanban/KanbanCard/KanbanCard';

const KanbanBoard = (): JSX.Element => {

  const [columns, setColumns] = useState<IColumn[]>(initialColumns);

  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const [tasks, setTasks] = useState<ITask[]>(initialTasks);

  const editColumnTitle = (id: UniqueIdentifier, title: string) => {
    setColumns(prevState => prevState.map(col => col.id === id ? { ...col, title } : col));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    })
  );

  const addNewColumn = () => {
    const newColumn: IColumn = {
      title: `column: ${columns.length}`,
      id: generateUniqueNumber(),
    };

    setColumns(prevState => [...prevState, newColumn]);
  };

  const addNewTask = (columnId: UniqueIdentifier) => {
    const newTask: ITask = {
      id: generateUniqueNumber(),
      columnId,
      content: 'task'
    };

    setTasks(prevState => [...prevState, newTask]);
  };

  const deleteTask = (taskId: UniqueIdentifier) => {
    setTasks(prevState => prevState.filter(task => task.id !== taskId));
  };

  const editTask = (taskId: UniqueIdentifier, value: string) => {
    setTasks(prevState => prevState.map(task => task.id === taskId ? { ...task, content: value } : task));
  };

  const deleteColumn = (columnId: UniqueIdentifier) => {
    setColumns(prevState => prevState.filter(el => el.id !== columnId));
    setTasks(prevState => prevState.filter(el => el.columnId !== columnId));
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(() => {
      const activeColumnIdx = columns.findIndex(c => c.id === activeColumnId);
      const overColumnIdx = columns.findIndex(c => c.id === overColumnId);

      return arrayMove(columns, activeColumnIdx, overColumnIdx);
    });
  };

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }


  return (
    <div className={styles.KanbanBoard}>
      <DndContext onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  onDragOver={onDragOver}
                  sensors={sensors}>
        <Flex gap={20}
              className={styles.KanbanBoard__columns}>

          <SortableContext items={columns.map(c => c.id)}>
            {columns.map(column => (
              <KanbanColumn key={column.id}
                            column={column}
                            deleteHandler={deleteColumn}
                            createTaskHandler={addNewTask}
                            editHandler={editColumnTitle}>
                <SortableContext items={tasks
                  .filter(task => task.columnId === column.id)
                  .map(task => task.id)}>
                  {tasks
                    .filter(task => task.columnId === column.id)
                    .map(task => (<KanbanCard task={task}
                                              key={task.id}
                                              editValue={editTask}
                                              deleteTask={deleteTask}/>))}
                </SortableContext>
              </KanbanColumn>
            ))}
          </SortableContext>

          <ColumnContainer className={styles.KanbanBoard__add}>
            <KanbanAddColumn onClick={addNewColumn}
                             disabled={columns.length > 10}/>
          </ColumnContainer>
        </Flex>
      </DndContext>
    </div>
  );
};
export default KanbanBoard;
