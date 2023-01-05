import { useEffect, Dispatch, SetStateAction } from 'react';

export const useCheckClickOutside = (
  setDisplay: Dispatch<SetStateAction<boolean>>,
  ref: any
) => {
  useEffect(() => {
    const handleClick = (e: any): void => {
      if (ref.current && !ref.current.contains(e.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, setDisplay]);
};
