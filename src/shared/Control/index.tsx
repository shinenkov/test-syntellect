import React, { InputHTMLAttributes, ReactElement, useMemo } from 'react';
import styles from './styles.module.css';

type ControlProps = {
  label?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftButtons?: ReactElement[];
  rightButtons?: ReactElement[];
};

const Control = React.memo(
  ({
    label,
    value,
    onChange,
    leftButtons,
    rightButtons,
    ...props
  }: ControlProps & InputHTMLAttributes<HTMLInputElement>) => {
    const mappedLeftButtons = useMemo(
      () => leftButtons?.map((item: ReactElement) => item),
      [leftButtons]
    );

    const mappedRightButtons = useMemo(
      () => rightButtons?.map((item: ReactElement) => item),
      [rightButtons]
    );

    return (
      <div className={styles.control}>
        {mappedLeftButtons}
        <input
          {...props}
          className={`${styles.input}`}
          value={value}
          placeholder={label}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        />
        {mappedRightButtons}
      </div>
    );
  }
);
export default Control;
