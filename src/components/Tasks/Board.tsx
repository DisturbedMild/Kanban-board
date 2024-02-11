import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task';
import Button from '../ui/Button';
import NewTaskModal from './NewTaskModal';
import BoardDropDown from '../Boards/BoardDropDown';

import type { IColumn, ITask } from '../types/types';
import type { DialogRefType } from '../ui/types';

type BoardProps = {
  column: IColumn;
  tasks: ITask[];
  createNewTaskHandler: (task: ITask, newTaskName: string, columnId: string) => void;
  updateTask: (task: ITask, taskTitle: string, taskDescription: string) => void;
  removeTask: (taskId: string, column: IColumn) => void;
  removeBoard: (column: IColumn) => void;
  sortTasks: (sortType: string, column: IColumn) => void;
};


const Board = ({ column, tasks, createNewTaskHandler, updateTask, removeTask, removeBoard, sortTasks }: BoardProps) => {
  const dialog = useRef<DialogRefType>(null);

  const modalElement = document.getElementById('modal');

  const openCreateNewTaskHandler = () => {
    dialog.current?.openDialog();
  };

  const removeBoardHandler = () => {
    removeBoard(column);
  };

  return (
    <div className='flex flex-col w-60 px-4 py-2 bg-neutral-400/20 rounded-lg h-max'>
      <div className='flex justify-between items-center mb-5 pb-3 border-b-2'>
        <h2 className='text-xl text-neutral-100'>{column.title}</h2>
        <BoardDropDown removeBoard={removeBoardHandler} sortTasks={sortTasks} column={column} />
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => {
          return (
            <div
              className='pb-5 flex flex-col gap-y-3'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task: ITask, index: number) => <Task key={task.id} column={column} index={index} task={task} updateTask={updateTask} removeTask={removeTask} />)}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
      {modalElement &&
        createPortal(
          <NewTaskModal
            columnId={column.id}
            dialog={dialog}
            createNewTaskHandler={createNewTaskHandler} />,
          modalElement)}
      <Button className='text-left' onClick={openCreateNewTaskHandler}>+ New Task</Button>
    </div>
  )
};

export default Board;
