import React from 'react';
import styles from './styles.module.css';

type ButtonProps = {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
};

const Button = React.memo((props: ButtonProps) => {
  const { label, onClick, disabled, style } = props;

  return (
    <button
      disabled={disabled}
      style={style}
      className={styles.button}
      onClick={onClick}
    >
      {label && <label>{label}</label>}
    </button>
  );
});

export default Button;
