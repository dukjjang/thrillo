import React from 'react';
import { Issue } from '../../types/issue';

interface Props {
  issue: Issue;
}

const Card = ({ issue }: Props) => {
  console.log(issue);
  return (
    <div className='duration-300 bg-sky-200 mb-2 cursor-move flex gap-2 p-4 border rounded border-slate-400'>
      <input type='checkbox' />
      <p>{issue.title}</p>
    </div>
  );
};

export default Card;
