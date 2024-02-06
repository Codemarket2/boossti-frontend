import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TaskContext';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  return (
    <>
      <input placeholder="Add task" value={text} onChange={(e) => setText(e.target.value)} />
      <button
        type="button"
        onClick={() => {
          setText('');
          dispatch({
            type: 'added',
            id: (nextId += 1),
            text,
          });
        }}
      >
        Add
      </button>
    </>
  );
}

let nextId = 3;
