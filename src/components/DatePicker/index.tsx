import { ChangeEventHandler } from 'react';

interface Props {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  deadLine: string;
}

const DatePicker = ({ handleChange, deadLine }: Props) => {
  return (
    <div>
      <input
        className='text-sm mb-3 py-1'
        onChange={handleChange}
        value={deadLine}
        name='deadLine'
        type='datetime-local'
      />
    </div>
  );
};

export default DatePicker;
