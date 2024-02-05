import { useState } from 'react';
import PropTypes from 'prop-types';

function AddTask({ onAddTask }) {
  const [newTaskText, setNewTaskText] = useState('');

  function handleInputChange(event) {
    setNewTaskText(event.target.value);
  }

  function handleAddButtonClick() {
    if (newTaskText.trim() !== '') {
      onAddTask(newTaskText);
      setNewTaskText('');
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTaskText}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleAddButtonClick}>
        Add
      </button>
    </div>
  );
}
AddTask.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onChangeTask({ ...task, done: !task.done })}
          />
          <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
          <button type="button" onClick={() => onDeleteTask(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onChangeTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};
export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: (nextId += 1),
        text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        }
        return t;
      }),
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];
