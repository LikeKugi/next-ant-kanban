import { UniqueIdentifier } from '@dnd-kit/core';

export interface IColumn {
  id: UniqueIdentifier,
  title: string,
}

export interface ITask {
  id: UniqueIdentifier;
  columnId: UniqueIdentifier;
  content: string;
}
