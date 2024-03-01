import { FC, JSX } from 'react';
import { Button, ConfigProvider } from 'antd';
import AddIcon from '@/shared/icons/AddIcon/AddIcon';
import styles from './KanbanAddColumn.module.scss';
import { kanbanAddColumnTheme } from '@/features/kanban/KanbanAddColumn/KanbanAddColumn.theme';
import { ButtonProps } from 'antd/es/button/button';
import { clsx } from 'clsx';

const KanbanAddColumn: FC<ButtonProps> = ({ className, ...other }): JSX.Element => {
  return (
    <ConfigProvider theme={kanbanAddColumnTheme}>
      <Button type="default"
              style={{ width: 256, height: 256, display: 'flex' }}
              className={clsx(className, styles.KanbanAddColumn)} {...other}>
        <span>Создать колонку</span>
        <AddIcon className={styles.KanbanAddColumn__icon}/>
      </Button>
    </ConfigProvider>
  );
};
export default KanbanAddColumn;
