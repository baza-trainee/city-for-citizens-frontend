import { useEffect } from 'react';

export const useOnClickOutside = (isVisible, ref, handler) => {
  useEffect(() => {
    if (isVisible) {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };

      document.addEventListener('click', listener);

      return () => {
        document.removeEventListener('click', listener);
      };
    }
  }, [ref, handler, isVisible]);
};

// Usage
/*
function Component () {
    const [isVisible, setIsVisible] = useState(false);

    const wrapperRef = useRef(null);

    useOnClickOutside(isVisible, wrapperRef, () =>
        setIsVisible(false)
    );

return (
    <>
        <button onClick={()=>setIsVisible(true)}>Open</button>
        {isVisible && <div ref={wrapperRef}>
            <p>Content</p>
        </div>
        }
    </>
    )
}
 */
