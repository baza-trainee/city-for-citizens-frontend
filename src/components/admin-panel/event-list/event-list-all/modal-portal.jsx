import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector('#portal');
    setMounted(true);
  }, []);

  return (
    mounted && ref.current && createPortal(<div>{children}</div>, ref.current)
  );
};
export default ModalPortal;
