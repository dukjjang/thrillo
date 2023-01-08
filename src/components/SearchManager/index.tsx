import {
  useState,
  ChangeEvent,
  useMemo,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import { defaultManagers } from '../../constants/dropList';
import { Issue } from '../../types/Types';
import { VscClose } from 'react-icons/vsc';

interface Props {
  setValue: Dispatch<SetStateAction<Issue>>;
  managers: string[];
}

const SearchManager = ({ setValue, managers }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState('');
  const [focused, setFocused] = useState(false);
  const [managerList, setManagerList] = useState<string[]>(managers);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredManagers = useMemo(
    () =>
      defaultManagers.filter((manager) => {
        return manager.name.toLowerCase().includes(filter.toLowerCase());
      }),
    [filter]
  );

  const handleClick = (manager: string) => {
    let newManagers: string[];

    if (managerList) {
      newManagers = [...managerList, manager];
    } else {
      newManagers = [manager];
    }

    setValue((prev) => ({
      ...prev,
      managers: newManagers,
    }));
    setManagerList(newManagers);
    setFilter('');
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleDeleteManager = (manager: string) => {
    const newManagers = managerList.filter((m) => m !== manager);
    console.log('뉴 메니저', newManagers);

    setValue((prev) => ({
      ...prev,
      managers: newManagers,
    }));

    setManagerList(newManagers);
  };

  return (
    <div
      onClick={() => searchRef.current?.focus()}
      className=' cursor-pointer flex w-full justify-start items-center relative z-10'
    >
      <p className='mr-3 w-12'>담당자</p>
      <div className='flex relative gap-2'>
        {managerList &&
          managerList.map((manager) => (
            <div key={manager} className='flex justify-center items-center'>
              <p className='mr-1'>{manager}</p>
              <button
                type='button'
                onClick={() => handleDeleteManager(manager)}
                className=' hover:bg-gray-100 active:bg-gray-300 rounded'
              >
                <VscClose size={16} />
              </button>
            </div>
          ))}
        <div className='inline-block relative'>
          <input
            ref={searchRef}
            onChange={handleChange}
            value={filter}
            onFocus={handleFocus}
            onBlur={() => setFocused(false)}
            placeholder={!managerList ? '비어있음' : ''}
            className=' block  cursor-pointer focus:cursor-text focus:w-[80px] w-0  rounded focus:shadow-md'
            type='text'
          />
          <ul
            className={`${
              focused ? 'block' : 'invisible'
            }  cursor-pointer absolute w-full rounded-b-lg bg-white border `}
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
      </div>
    </div>
  );
};

export default SearchManager;
