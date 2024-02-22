import {DragDropContext} from 'react-beautiful-dnd';

import AddNewTasksBoardPlate from './AddNewTasksBoardPlate';
import Board from '../Tasks/Board';


import './boards.css';
import useBoard from "../../hooks/Boards.hooks.tsx";

type BoardsProps = {
  projectName: string
};

export type Board = {
  id: string,
  name: string
};

const Boards = ({ projectName }: BoardsProps) => {
  const {
    boards,
    onDragEndHandler,
    sortTasks,
    removeTask,
    createNewListHandler,
    updateTask,
    createNewTaskHandler,
    removeBoard
  } = useBoard();

  return (
    <section className='boards' id='boards'>
      <div className='py-4 inner bg-neutral-700/50 border-b-2 border-neutral-700'>
        <div className='px-32 mx-auto'>
          <h2 className='text-1xl font-semibold'>{projectName}</h2>
        </div>
      </div>
      <div className='px-32 mt-6 overflow-auto board-wrapper'>
        <div className={'flex gap-4 w-fit'}>
          <DragDropContext onDragEnd={onDragEndHandler}>
            <div className='board-columns flex gap-4 boards-inner w-fit'>
              {boards && boards.columnOrder.map((columnId: string) => {
                const column = boards.columns[columnId];
                const tasks = column.taskIds.map((taskId: string) => boards.tasks[taskId]);

                return <Board
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  createNewTaskHandler={createNewTaskHandler}
                  updateTask={updateTask}
                  removeTask={removeTask}
                  removeBoard={removeBoard}
                  sortTasks={sortTasks}
                />
              })}
            </div>
          </DragDropContext>
          <AddNewTasksBoardPlate createNewListHandler={createNewListHandler} />
        </div>
      </div>
    </section>
  )
}

export default Boards;
