import { IColumn, ITask } from '@/shared/types';

export const initialColumns: IColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
  },
  {
    id: "reopen",
    title: "Reopen",
  },
  {
    id: "done",
    title: "Done",
  },
];

export const initialTasks: ITask[] = [
  {
    id: "1",
    columnId: "backlog",
    content: "List admin APIs for dashboard",
  },
  {
    id: "2",
    columnId: "backlog",
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "3",
    columnId: "reopen",
    content: "Conduct security testing",
  },
  {
    id: "4",
    columnId: "reopen",
    content: "Analyze competitors",
  },
  {
    id: "5",
    columnId: "done",
    content: "Create UI kit documentation",
  },
  {
    id: "6",
    columnId: "done",
    content: "Dev meeting",
  },
  {
    id: "7",
    columnId: "done",
    content: "Deliver dashboard prototype",
  },
  {
    id: "8",
    columnId: "backlog",
    content: "Optimize application performance",
  },
  {
    id: "9",
    columnId: "backlog",
    content: "Implement data validation",
  },
  {
    id: "10",
    columnId: "backlog",
    content: "Design database schema",
  },
  {
    id: "11",
    columnId: "backlog",
    content: "Integrate SSL web certificates into workflow",
  },
  {
    id: "12",
    columnId: "reopen",
    content: "Implement error logging and monitoring",
  },
  {
    id: "13",
    columnId: "reopen",
    content: "Design and implement responsive UI",
  },
];
