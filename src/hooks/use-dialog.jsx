import { useState } from 'react';

const useDialog = (initialMode = false, initialData) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(300);
  const [data, setData] = useState(initialData);
  const setDialogOpen = (state) => {
    setModalOpen(state);
    if (state === false) {
      setData(undefined);
    }
  };

  const onResize = (event) => {
    setHeight(height + event.movementY);
    setWidth(width + event.movementX);
  };

  return {
    open: modalOpen,
    data,
    setData,
    setDialogOpen,
    resizable: { height, width, setHeight, setWidth, onResize },
  };
};

export default useDialog;
