import {
  useState,
  ChangeEvent,
  useMemo,
  Dispatch,
  SetStateAction,
  useRef,
  MouseEvent,
} from 'react';
import { defaultManagers } from '../../constants/dropList';
import { Issue } from '../../types/Types';
import { VscClose } from 'react-icons/vsc';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Props {
  setValue: Dispatch<SetStateAction<Issue>>;
  managers: string[];
}

const SearchManager = ({ setValue, managers }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState('');
  const [focused, setFocused] = useState(false);
  const [managerList, setManagerList] = useState<string[]>(managers);
  const [editMode, setEditMode] = useState(false);
  const domNode = useClickOutside(setEditMode);

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
    setFocused(!focused);
    setEditMode(!editMode);
    searchRef.current?.blur();
  };

  const handleDeleteManager = (manager: string) => {
    const newManagers = managerList.filter((m) => m !== manager);

    setValue((prev) => ({
      ...prev,
      managers: newManagers,
    }));

    searchRef.current?.blur();
    setEditMode(false);
    setFocused(false);
    setManagerList(newManagers);
  };

  const handleEditMode = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (target.tagName !== 'svg') {
      searchRef.current?.focus();
      setFocused(true);
      setEditMode(true);
    }
    if (target.tagName === 'svg') {
      searchRef.current?.blur();

      setFocused(false);
      setEditMode(false);
    }
  };

  const handleBlur = () => {
    setFocused(false);
    searchRef.current?.blur();
  };

  console.log('focus', focused);
  console.log('editMode', editMode);
  console.log('managerList', managerList);
  return (
    <div
      ref={domNode as React.RefObject<HTMLDivElement>}
      onClick={(e) => {
        handleEditMode(e);
      }}
      className={` 
      } cursor-pointer flex w-full justify-start items-center relative z-10`}
    >
      <p className='mr-3 w-12'>담당자</p>
      <div
        className={`
      ${editMode && 'bg-sky-50'}
      flex justify-start relative w-full  `}
      >
        {managerList.map((manager) => (
          <div
            key={manager}
            className='mr-2 w-auto flex justify-start items-center'
          >
            <p className='w-[45px]'>{manager}</p>
            {editMode && (
              <button
                type='button'
                onClick={() => handleDeleteManager(manager)}
                className={`mr-1 hover:bg-gray-100 active:bg-gray-300 rounded`}
              >
                <VscClose size={16} />
              </button>
            )}
          </div>
        ))}
        {
          <div className=' peer-1 inline-block w-full relative'>
            {managerList.length < 4 && (
              <input
                ref={searchRef}
                onChange={handleChange}
                value={filter}
                placeholder={!managerList ? '비어있음' : ''}
                className='peer bg-sky-50 block cursor-pointer focus:cursor-text w-full '
                type='text'
              />
            )}
            <ul
              className={` peer-focus:block hidden cursor-pointer absolute w-full rounded-b-lg bg-white border `}
            >
              {filteredManagers
                .filter((m) => !managerList.includes(m.name))
                .map((manager) => {
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
        }
      </div>
    </div>
  );
};

export default SearchManager;
