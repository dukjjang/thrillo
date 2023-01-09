import { ChangeEventHandler } from 'react';
import { TbPentagon } from 'react-icons/tb';
import Property from '../Property';

interface Props {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  deadLine: string;
}

const DatePicker = ({ handleChange, deadLine }: Props) => {
  return (
    <div className='flex  py-2'>
      <Property Icon={TbPentagon} name='마감일' />
      <input
        className=' text-sm '
        onChange={handleChange}
        value={deadLine}
        name='deadLine'
        type='datetime-local'
      />
    </div>
  );
};

export default DatePicker;
