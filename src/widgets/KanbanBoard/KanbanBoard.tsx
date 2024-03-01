'use client'

import { JSX, useState } from 'react';
import { Flex } from 'antd';
import styles from './KanbanBoard.module.scss';
import KanbanColumn from '@/features/kanban/KanbanColumn/KanbanColumn';
import KanbanAddColumn from '@/features/kanban/KanbanAddColumn/KanbanAddColumn';
import { IColumn } from '@/shared/types';
import { generateUniqueNumber } from '@/shared/utils/generateUniqueNumber';
import ColumnContainer from '@/shared/ui/ColumnContainer/ColumnContainer';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

const KanbanBoard = (): JSX.Element => {

  const [columns, setColumns] = useState<IColumn[]>([]);

  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null)

  const editColumnTitle = (id: UniqueIdentifier, title: string) => {
    setColumns(prevState => prevState.map(col => col.id === id ? {...col, title} : col));
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    })
  )

  const addNewColumn = () => {
    const newColumn: IColumn = {
      title: `column: ${columns.length}`,
      id: generateUniqueNumber(columns.map(c => c.id)),
    }

    setColumns(prevState => [...prevState, newColumn])
  }

  const deleteColumn = (columnId: UniqueIdentifier) => {
    setColumns(prevState => prevState.filter(el => el.id !== columnId))
  }

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(() => {
      const activeColumnIdx = columns.findIndex(c => c.id === activeColumnId);
      const overColumnIdx = columns.findIndex(c => c.id === overColumnId);

      return arrayMove(columns, activeColumnIdx, overColumnIdx);
    })
  }

  return (
    <div className={styles.KanbanBoard}>
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
      <Flex gap={20} className={styles.KanbanBoard__columns}>

          <SortableContext items={columns.map(c => c.id)} >
            {columns.map(column => (
              <KanbanColumn key={column.id} column={column} deleteHandler={deleteColumn} editHandler={editColumnTitle} />
            ))}
          </SortableContext>

        <ColumnContainer className={styles.KanbanBoard__add}>
          <KanbanAddColumn onClick={addNewColumn} disabled={columns.length > 10} />
        </ColumnContainer>
      </Flex>
      </DndContext>
    </div>
  );
};
export default KanbanBoard;
