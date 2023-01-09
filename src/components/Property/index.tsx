import { IconType } from 'react-icons/lib';

interface Props {
  Icon: IconType;
  name: string;
}

const Property = ({ Icon, name }: Props) => {
  return (
    <div className='flex justify-start items-center w-[72px] gap-1 mr-2 text-sm whitespace-nowrap'>
      <Icon className='min-w-[18px] h-[18px] mr-1 opacity-50 ' />
      <p>{name}</p>
    </div>
  );
};

export default Property;
