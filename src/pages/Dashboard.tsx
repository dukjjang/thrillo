import { useMemo, useState } from "react";
import Snowfall from "react-snowfall";
import Board from "../components/Board";
import Search from "../components/Search";
import { useDragAndDrop } from "../hooks/useDranAndDrop";
import { useSortBoards } from "../constants/getLocalData";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
import { IBoard } from "../types/Types";
import useDebounce from "../hooks/useDebounce";
import Today from "../components/Today";

const Dashboard = () => {
  const [boards, setBoards] = useState(useSortBoards);
  const [filter, setFilter] = useState("");
  const [light, setLight] = useState(true);

  const [targetCard, setTargetCard] = useState({
    boardId: -1,
    cardId: -1,
  });

  const debouncedSearch = useDebounce(filter, 300);

  const filteredBoards = useMemo(
    () =>
      boards.map((board: IBoard) => {
        const filteredCards = board.cards.filter((card) => {
          return (
            card.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            card.managers.filter((m) =>
              m.toLowerCase().includes(debouncedSearch.toLowerCase())
            ).length ||
            card.content.toLowerCase().includes(debouncedSearch.toLowerCase())
          );
        });
        const filteredBoard = { ...board, cards: filteredCards };
        return filteredBoard;
      }),
    [boards, debouncedSearch]
  );

  const {
    handleDragStart,
    handleDragEnter,
    handleDrop,
    dragMargin,
    handleDelete,
  } = useDragAndDrop(
    boards,
    filteredBoards,
    setBoards,
    targetCard,
    setTargetCard
  );

  return (
    <main className=" fixed overflow-auto  h-full w-full py-10 px-10 lg:px-[250px] xl:px-[300px] ">
      <Snowfall snowflakeCount={70} />
      <header className="mb-3 gap-2 flex justify-center items-center">
        {light ? (
          <FaLightbulb
            onClick={() => setLight(!light)}
            size={40}
            className=" cursor-pointer text-yellow-400"
          />
        ) : (
          <FaRegLightbulb
            className=" cursor-pointer"
            onClick={() => setLight(!light)}
            size={40}
          />
        )}

        <h1 className="flex text-red-700 text-6xl [&_p]:text-green-700 text-center font-semibold">
          T<p>h</p>r<p>i</p>llo
        </h1>
      </header>

      <div className="py-6 md:px-10 m-auto w-[95%] border-b-2 mb-5 flex justify-between items-center">
        <Today />
        <Search
          filter={filter}
          boards={boards}
          setFilter={setFilter}
          setBoards={setBoards}
        />
      </div>
      <div className="grid md:grid-cols-3">
        {filteredBoards.map((board: IBoard) => {
          return (
            <Board
              key={board.id}
              board={board}
              boards={boards}
              setBoards={setBoards}
              filter={filter}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              handleDragEnter={handleDragEnter}
              targetCard={targetCard}
              dragMargin={dragMargin}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Dashboard;

//
//
//
