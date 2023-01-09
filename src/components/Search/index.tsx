import {
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
  useRef,
  RefObject,
} from 'react';
import { IBoard } from '../../types/Types';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { VscClose } from 'react-icons/vsc';
import CardDetail from '../CardDetail';
import { emptyCard } from '../../constants/boardsData';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Props {
  filter: string;
  boards: IBoard[];
  setFilter: Dispatch<SetStateAction<string>>;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}

const Search = ({ setBoards, filter, boards, setFilter }: Props) => {
  const [modal, setModal] = useState(false);
  const [focused, setFocused] = useState(false);
  const searchRef = useClickOutside(setFocused);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleblur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const next = e.relatedTarget;
    if (next !== null && filter) {
      searchRef.current?.focus();
      return;
    }
  };

  return (
    <div className='py-6 md:px-10 m-auto w-[95%] border-b-2 mb-5 flex justify-end items-center'>
      <label className='flex cursor-pointer ' htmlFor='managerInput'>
        <RxMagnifyingGlass
          className='mr-1 hover:text-sky-400 hover:scale-150 duration-150 '
          size={20}
        />
      </label>
      <div className={` relative flex w-fit items-center`}>
        <input
          id='managerInput'
          ref={searchRef as RefObject<HTMLInputElement>}
          onChange={handleOnChange}
          className='peer focus:w-[170px] text-black w-0 p-0 focus:border duration-300 focus:p-2 rounded-lg text-sm mr-2 focus:mr-0 bg-white  '
          required
          type='text'
          placeholder='검색'
          onBlur={(e) => {
            handleblur(e);
          }}
          value={filter}
        />
        {
          <div className='peer-focus:absolute inline cursor-pointer peer-valid:block peer-invalid:hidden right-0 min-w-fit mx-1 hover:text-red-500 hover:scale-150 duration-150 '>
            <VscClose className='' onClick={() => setFilter('')} size={20} />
          </div>
        }
      </div>
      <div
        onClick={toggleModal}
        className=' border cursor-pointer shadow-xl rounded-lg px-3 py-2 text-center min-w-fit text-sm bg-sky-300  '
      >
        새로 만들기
      </div>
      {modal && (
        <CardDetail
          cardIdx={-20}
          boards={boards}
          setBoards={setBoards}
          toggleModal={setModal}
          item={emptyCard}
        />
      )}
    </div>
  );
};

export default Search;
