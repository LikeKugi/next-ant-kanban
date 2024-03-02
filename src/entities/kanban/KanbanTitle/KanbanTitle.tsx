import React, { FC, JSX, useState } from 'react';
import MoreIcon from '@/shared/icons/MoreIcon/MoreIcon';
import styles from './KanbanTitle.module.scss';
import { Button, Input } from 'antd';

interface IKanbanTitleProps {
  title: string;
  deleteHandler?: () => void;
  editHandler: (arg: string) => void;
}

const KanbanTitle: FC<IKanbanTitleProps> = ({ title, deleteHandler, editHandler }): JSX.Element => {
  const [isEditable, setIsEditable] = useState(false);

  const toggleEditable = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLInputElement) return;
    setIsEditable(prevState => !prevState);
  };

  return (
    <div className={styles.KanbanTitle}
         onClick={toggleEditable}>
      <div className={styles.KanbanTitle__content}>
        {isEditable ? (<Input autoFocus
                              value={title}
                              onChange={(e) => editHandler(e.target.value)}
                              onKeyPress={(e) => setIsEditable(e.key !== 'Enter')}
                              onBlur={() => setIsEditable(false)}/>) : <span>{title}</span>}

      </div>
      {deleteHandler && <Button type="text"
                                onClick={deleteHandler}
                                style={{
                                  maxWidth: 'max-content',
                                  maxHeight: 'max-content',
                                  padding: 0,
                                  display: 'flex',
                                }}
                                className={styles.KanbanTitle__btn}><MoreIcon/></Button>}
    </div>
  );
};
export default KanbanTitle;
