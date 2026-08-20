import { useState } from 'react';

export const useApiActionButton = (asyncActionFunc: () => Promise<void>) => {
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
};
