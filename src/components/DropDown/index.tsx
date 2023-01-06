import { Dispatch, SetStateAction, useState } from 'react';
import { Issue } from '../../types/Types';

interface Props {
  name: string;
  value: string;
  dropList: string[];
  setValue: Dispatch<SetStateAction<Issue>>;
}

const DropDown = ({ value, name, setValue, dropList }: Props) => {
  const [isDropDown, setIsDropDown] = useState(false);
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
    <div className=' w-[200px] relative' onClick={handleSelect}>
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
        } absolute w-full bg-white cursor-pointer border rounded z-10  `}
      >
        {dropList.map((item, key) => (
          <div key={key} className=' hover:bg-sky-300 p-2'>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;