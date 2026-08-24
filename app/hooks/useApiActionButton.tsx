import { useState } from 'react';

export function useApiActionButton<T>(asyncActionFunc: () => Promise<T>) {
  const [disabled, setDisabled] = useState(false);

  const onClick = async () => {
    setDisabled(true);
    await asyncActionFunc();
    setDisabled(false);
  };

  return {
    disabled,
    onClick,
  };
}
