import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const MessagePortal = ({ setIsShowMessage, children }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector('#message-portal');
    setMounted(true);
    const timer = setTimeout(() => setIsShowMessage(false), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    mounted &&
    ref.current &&
    createPortal(
      <div
        className="fixed left-0 top-0 h-full w-full
       overflow-auto"
      >
        {children}
      </div>,
      ref.current
    )
  );
};
export default MessagePortal;
