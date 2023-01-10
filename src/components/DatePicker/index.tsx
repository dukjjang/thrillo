import { ChangeEventHandler } from 'react';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import Property from '../Property';

interface Props {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  deadLine: string;
}

const DatePicker = ({ handleChange, deadLine }: Props) => {
  return (
    <div className='flex py-2 '>
      <Property Icon={IoCalendarNumberOutline} name='마감일' />
      <input
        className='text-sm bg-slate-100 '
        onChange={handleChange}
        value={deadLine}
        name='deadLine'
        type='datetime-local'
      />
    </div>
  );
};

export default DatePicker;
