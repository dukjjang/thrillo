import {
  useState,
  ChangeEvent,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import { managers } from '../../constants/dropList';
import { Issue } from '../../types/Types';

interface Props {
  setValue: Dispatch<SetStateAction<Issue>>;
}

const SearchManager = ({ setValue }: Props) => {
  const [filter, setFilter] = useState('');
  const [focused, setFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredManagers = useMemo(
    () =>
      managers.filter((manager) => {
        return manager.name.toLowerCase().includes(filter.toLowerCase());
      }),
    [filter]
  );

  const handleClick = (manager: string) => {
    setValue((prev) => ({ ...prev, manager: manager }));
    setFilter(manager);
  };

  const handleFocus = () => {
    setFilter('');
    setFocused(true);
  };

  return (
    <div className='w-[200px] relative z-10'>
      <input
        onChange={handleChange}
        required
        value={filter}
        onFocus={handleFocus}
        onBlur={() => setFocused(false)}
        placeholder='담당자 검색'
        className=' px-3 py-2 cursor-pointer   focus:cursor-text focus:border w-[200px] rounded focus:shadow-md mb-3'
        type='text'
      />
      <ul
        className={`${
          focused ? 'block' : 'invisible'
        }  cursor-pointer absolute w-full bg-white border `}
      >
        {filteredManagers.map((manager) => {
          const { name } = manager;
          return (
            <li
              key={name}
              onMouseDown={() => handleClick(name)}
              className='p-3 list-none hover:bg-sky-200'
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchManager;
