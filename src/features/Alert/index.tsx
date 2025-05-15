import { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import AlertStore from 'store/AlertStore';
import Button from 'shared/Button';
import Control from 'shared/Control';

const Alert = observer(() => {
  const [alertStore] = useState(() => new AlertStore());
  const numberLabel = 'number';
  const everyLabel = 'every';

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      alertStore.change(e.target.value);
    },
    [alertStore]
  );

  const handleNumber = useCallback(() => {
    alertStore.number();
  }, [alertStore]);

  const handleEvery = useCallback(() => {
    alertStore.every();
  }, [alertStore]);

  const buttons = useMemo(
    () => ({
      left: [
        <Button key={numberLabel} label={numberLabel} onClick={handleNumber} />,
      ],
      right: [
        <Button key={everyLabel} label={everyLabel} onClick={handleEvery} />,
      ],
    }),
    [handleEvery, handleNumber]
  );

  return (
    <Control
      value={alertStore.value}
      label={`${numberLabel}-${everyLabel}`}
      onChange={handleChange}
      leftButtons={buttons.left}
      rightButtons={buttons.right}
    />
  );
});

export default Alert;
