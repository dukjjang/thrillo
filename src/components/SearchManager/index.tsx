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
    setTimeout(() => {
      searchRef.current?.focus();
    }, 300);
  };

  const handleDeleteManager = (manager: string) => {
    const newManagers = managerList.filter((m) => m !== manager);

    setValue((prev) => ({
      ...prev,
      managers: newManagers,
    }));

    searchRef.current?.blur();
    setEditMode(false);
    setManagerList(newManagers);
  };

  const handleEditMode = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (target.tagName !== 'svg') {
      setEditMode(true);
      setTimeout(() => {
        searchRef.current?.focus();
      }, 300);
    }
    if (target.tagName === 'svg') {
      setEditMode(false);
      setTimeout(() => {
        searchRef.current?.blur();
      }, 300);
    }
    setFilter('');
  };

  return (
    <div
      ref={domNode as React.RefObject<HTMLDivElement>}
      onClick={(e) => {
        handleEditMode(e);
      }}
      className={` 
      }  py-2 cursor-pointer flex w-full justify-start items-center z-10`}
    >
      <p className='mr-3 min-w-[45px]'>담당자</p>
      <div
        className={`
      ${editMode && 'bg-sky-50 border'}
      bg-[#f7f7f5] 
      flex justify-start items-center h-10 px-2 relative w-full flex-wrap rounded-md `}
      >
        {managerList.map((manager) => (
          <div
            key={manager}
            className='mr-2 w-auto flex justify-start items-center'
          >
            <p className='w-[40px] text-sm'>{manager}</p>
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
        {editMode && (
          <div className=' peer-1 inline w-[45px] '>
            {managerList.length < 4 && (
              <input
                ref={searchRef}
                onChange={handleChange}
                value={filter}
                placeholder={!managerList ? '비어있음' : ''}
                className='peer flex justify-center z-20 items-center bg-[#f7f7f5] text-sm  cursor-pointer w-[45px] '
                type='text'
              />
            )}
            {filter && (
              <ul
                className={`text-sm cursor-pointer absolute left-0 top-[38px] w-full z-20 rounded-b-lg bg-white border `}
              >
                {filteredManagers
                  .filter((m) => !managerList.includes(m.name))
                  .map((manager) => {
                    const { name } = manager;
                    return (
                      <li
                        key={name}
                        onMouseDown={() => handleClick(name)}
                        className=' py-2 list-none hover:bg-gray-50'
                      >
                        {name}
                      </li>
                    );
                  })}
                {!filteredManagers.length && <li className='py-2'>결과없음</li>}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchManager;
