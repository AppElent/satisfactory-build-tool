import { useReducer } from 'react';

const useManualRerender = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
};

export default useManualRerender;
