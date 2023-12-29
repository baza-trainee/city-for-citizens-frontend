import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = props => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector('#portal');
    setMounted(true);
  }, []);

  return (
    mounted &&
    ref.current &&
    createPortal(
      <div
        className="fixed left-0 top-0 h-full w-full
       overflow-auto bg-primary/0 bg-opacity-50"
      >
        {props.children}
      </div>,
      ref.current
    )
  );
};
export default ModalPortal;
