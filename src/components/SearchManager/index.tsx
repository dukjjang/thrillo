import {
  useState,
  ChangeEvent,
  useMemo,
  Dispatch,
  SetStateAction,
  useRef,
  MouseEvent,
} from 'react';
import { choosableManagers } from '../../constants/dropList';
import { Issue } from '../../types/Types';
import { VscClose } from 'react-icons/vsc';
import { TbUsers } from 'react-icons/tb';
import { useClickOutside } from '../../hooks/useClickOutside';
import Property from '../Property';

interface Props {
  setValue: Dispatch<SetStateAction<Issue>>;
  currentManagers: string[];
}

const SearchManager = ({ setValue, currentManagers }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState('');
  const [managerList, setManagerList] = useState<string[]>(currentManagers);
  const [editMode, setEditMode] = useState(false);
  const domNode = useClickOutside(setEditMode);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredManagerList = useMemo(
    () =>
      filter
        ? choosableManagers.filter((manager) => {
            return manager.name.toLowerCase().includes(filter.toLowerCase());
          })
        : [],
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

  const handleDelete = (manager: string) => {
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

    if (target.tagName !== 'svg') setEditMode(true);
    else setEditMode(false);
    searchRef.current?.focus();
  };

  const displayInput = managerList.length !== choosableManagers.length;
  return (
    <div className='flex py-1 text-sm'>
      <Property Icon={TbUsers} name='담당자' />
      <div
        ref={domNode as React.RefObject<HTMLDivElement>}
        onClick={handleEditMode}
        className={`relative flex justify-start items-center w-[75%] p-1 border cursor-pointer `}
      >
        <ul className='peer/ul flex gap-1 mr-1 whitespace-nowrap'>
          {managerList.map((name) => (
            <li key={name} className='flex justify-center items-center'>
              <p>{name}</p>
              {editMode && (
                <button onClick={() => handleDelete(name)}>
                  <VscClose size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>
        {displayInput && (
          <input
            ref={searchRef}
            onChange={handleChange}
            onBlur={() => setFilter('')}
            value={filter}
            placeholder={!managerList ? '비어있음' : ''}
            className='peer/input w-full rounded-lg'
            type='text'
          />
        )}
        {editMode && displayInput && (
          <ul className='absolute w-full z-10 top-[35px] border bg-white'>
            {!filteredManagerList.length && <li className='p-1'>결과없음</li>}
            {filteredManagerList
              .filter((m) => !managerList.includes(m.name))
              .map((manager) => {
                const { name } = manager;
                return (
                  <li
                    key={name}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleClick(name)}
                    className='p-1'
                  >
                    {name}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchManager;
