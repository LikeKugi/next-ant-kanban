import { FC, JSX } from 'react';
import { Button, ConfigProvider } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import PlusIcon from '@/shared/icons/PlusIcon/PlusIcon';
import { kanbanAddTaskTheme } from './KanbanAddTask.theme';

const KanbanAddTask: FC<ButtonProps> = ({children, ...other}): JSX.Element => {
  return (
    <ConfigProvider theme={kanbanAddTaskTheme}>
      <Button style={{width: '100%'}} {...other}>
        <PlusIcon />
      </Button>
    </ConfigProvider>

  );
};
export default KanbanAddTask;
