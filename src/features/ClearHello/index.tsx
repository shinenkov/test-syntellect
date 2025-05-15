import { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ClearHelloStore from 'store/ClearHelloStore';
import Button from 'shared/Button';
import Control from 'shared/Control';

const ClearHello = observer(() => {
  const [clearHelloStore] = useState(() => new ClearHelloStore());
  const clearLabel = 'clear';
  const helloLabel = 'hello';

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      clearHelloStore.change(e.target.value);
    },
    [clearHelloStore]
  );

  const handleClear = useCallback(() => {
    clearHelloStore.clear();
  }, [clearHelloStore]);

  const handleHello = useCallback(() => {
    clearHelloStore.hello();
  }, [clearHelloStore]);

  const buttons = useMemo(
    () => [
      <Button key={clearLabel} label={clearLabel} onClick={handleClear} />,
      <Button key={helloLabel} label={helloLabel} onClick={handleHello} />,
    ],
    [handleClear, handleHello]
  );

  return (
    <Control
      value={clearHelloStore.value}
      label={`${clearLabel}-${helloLabel}`}
      onChange={handleChange}
      rightButtons={buttons}
    />
  );
});

export default ClearHello;
