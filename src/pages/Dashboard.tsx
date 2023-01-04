const Dashboard = () => {
  return (
    <div>
      <h1 className='mb-2 text-4xl'>Todo List</h1>
      <div className='mb-5'>
        <input
          className=' border-2 rounded '
          type='text'
          name='todoName'
          placeholder='wirte your todo'
        />
        <button type='button'>Add Todo</button>
      </div>
      <main className='flex'>
        <div id='todo' className=' border w-[500px] h-[700px] p-5'></div>
        <div id='inProgress' className=' border w-[500px] h-[700px] p-5'></div>
        <div id='completed' className=' border w-[500px] h-[700px] p-5'></div>
      </main>
    </div>
  );
};

export default Dashboard;
