import { FC, JSX, SVGProps } from 'react';
import styles from './AddIcon.module.scss';
import { clsx } from 'clsx';


const AddIcon: FC<SVGProps<SVGSVGElement>> = ({ className, width = 25, height = 24, ...other }): JSX.Element => {
  return (
    <svg width={25}
         height={24}
         viewBox="0 0 25 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...other}
         className={clsx(styles.AddIcon, className)}>
      <path fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 8.25C12.9142 8.25 13.25 8.58579 13.25 9V15C13.25 15.4142 12.9142 15.75 12.5 15.75C12.0858 15.75 11.75 15.4142 11.75 15V9C11.75 8.58579 12.0858 8.25 12.5 8.25Z"
            fill="currentColor"/>
      <path fillRule="evenodd"
            clipRule="evenodd"
            d="M16.25 12C16.25 12.4142 15.9142 12.75 15.5 12.75H9.5C9.08579 12.75 8.75 12.4142 8.75 12C8.75 11.5858 9.08579 11.25 9.5 11.25H15.5C15.9142 11.25 16.25 11.5858 16.25 12Z"
            fill="currentColor"/>
      <path fillRule="evenodd"
            clipRule="evenodd"
            d="M2.75 12C2.75 6.61522 7.11522 2.25 12.5 2.25C17.8848 2.25 22.25 6.61522 22.25 12C22.25 17.3848 17.8848 21.75 12.5 21.75C7.11522 21.75 2.75 17.3848 2.75 12ZM12.5 3.75C7.94365 3.75 4.25 7.44365 4.25 12C4.25 16.5563 7.94365 20.25 12.5 20.25C17.0563 20.25 20.75 16.5563 20.75 12C20.75 7.44365 17.0563 3.75 12.5 3.75Z"
            fill="currentColor"/>
    </svg>

  );
};
export default AddIcon;
