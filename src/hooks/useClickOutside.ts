import { useEffect, Dispatch, SetStateAction, useRef, RefObject } from 'react';

export const useClickOutside = (
  setDisplay: Dispatch<SetStateAction<boolean>>
): RefObject<HTMLUListElement> => {
  const domNode = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const handleClick = (e: any): void => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        setTimeout(() => {
          setDisplay(false);
        }, 0);
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [domNode, setDisplay]);

  return domNode;
};
