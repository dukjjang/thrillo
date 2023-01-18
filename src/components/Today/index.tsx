import { getCurrentDate } from "../../constants/getCurrentDate";

const Today = () => {
  const { date, month, year } = getCurrentDate();
  return (
    <div className="text-sm lg:text-3xl flex flex-col">
      <h1 className=" text-red-800 font-bold text-2xl lg:text-6xl text-center">
        {date}
      </h1>
      <div className="flex items-center">
        <h1 className="mr-1 text-slate-300 ">{month}</h1>
        <h1 className="text-green-800">{year}</h1>
      </div>
    </div>
  );
};

export default Today;
