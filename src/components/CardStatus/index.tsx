import { Dispatch, SetStateAction, useState, RefObject } from 'react';
import { Issue } from '../../types/Types';
import { useClickOutside } from '../../hooks/useClickOutside';
import { TbPentagon } from 'react-icons/tb';
import Property from '../Property';

interface Props {
  name: string;
  value: string;
  dropList: string[];
  setValue: Dispatch<SetStateAction<Issue>>;
}

const CardStatus = ({ value, name, setValue, dropList }: Props) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const dropDownRef = useClickOutside(setIsDropDown);
  const toggleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  function handleSelect(e: React.MouseEvent<HTMLElement>) {
    const eventTarget = e.target as HTMLElement;
    if (eventTarget.tagName !== 'INPUT')
      setValue((prev) => ({ ...prev, [name]: eventTarget.innerText }));
    toggleDropDown();
  }

  return (
    <div className='flex whitespace-nowrap py-1 text-sm'>
      <Property Icon={TbPentagon} name='상태' />
      <div
        ref={dropDownRef as RefObject<HTMLDivElement>}
        className='relative w-[200px] py-1 '
      >
        <input
          onClick={toggleDropDown}
          className=' cursor-pointer'
          placeholder={name}
          value={value}
          readOnly
        />
        <div
          className={`${
            isDropDown ? 'block' : 'hidden'
          } absolute w-full whitespace-nowrap bg-white cursor-pointer border rounded z-10  `}
        >
          {dropList.map((item, key) => (
            <div
              key={key}
              onClick={handleSelect}
              className=' hover:bg-sky-300 p-2'
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardStatus;
