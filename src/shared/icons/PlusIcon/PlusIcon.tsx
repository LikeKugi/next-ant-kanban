import { FC, JSX, SVGProps } from 'react';
import { clsx } from 'clsx';
import styles from './PlusIcon.module.scss';

const PlusIcon: FC<SVGProps<SVGSVGElement>> = ({ className, width = 24, height = 24, ...other }): JSX.Element => {
  return (
    <svg width={width}
         height={height}
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg" {...other}
         className={clsx(className, styles.PlusIcon)}>
      <path d="M12 6V18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"/>
      <path d="M18 12L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"/>
    </svg>

  );
};
export default PlusIcon;
