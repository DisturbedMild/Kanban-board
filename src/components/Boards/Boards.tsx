import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';

import AddNewTasksBoardPlate from './AddNewTasksBoardPlate';
import Board from '../Tasks/Board';

import type { DropResult } from 'react-beautiful-dnd';
import type { IColumn, IData, ITask } from '../types/types';

import './boards.css';

type BoardsProps = {
  projectName: string
};

export type Board = {
  id: string,
  name: string
};

const Boards = ({ projectName }: BoardsProps) => {
  const [boards, setBoards] = useState<IData>();

  // Creating new empty board list
  const createNewListHandler = (listTitle: string) => {
    setBoards((prevState) => {
      if (prevState) {

        const newState = { ...prevState };
        const columnId = uuidv4();
        const newColumn = {
          id: columnId,
          title: listTitle,
          taskIds: []
        };

        newState.columns[columnId] = newColumn;
        newState.columnOrder.push(columnId);

        return newState
      } else {
        const columnName = uuidv4();
        const newState = {
          tasks: {
          },
          columns: {
            [columnName]: {
              id: columnName,
              title: listTitle,
              taskIds: []
            }
          },
          columnOrder: [columnName]
        };

        return newState;
      }

    })
  }

  const removeBoard = (column: IColumn) => {
    setBoards((prevState) => {
      if (prevState) {
        const updatedColumnOrder = prevState?.columnOrder.filter((id: string) => id !== column.id);
        const updatedColumn = Object.fromEntries(Object.entries(prevState.columns).filter(([key]) => key !== column.id));

        const newState = {
          ...prevState,
          columns: updatedColumn,
          columnOrder: updatedColumnOrder,
        };

        return newState;
      }
    })
  }

  // Creating new Task
  const createNewTaskHandler = (task: ITask, taskName: string, columnId: string) => {
    setBoards((prevState) => {
      if (prevState) {
        const taskIds = prevState?.columns[columnId].taskIds;

        const newState = {
          ...prevState,
          tasks: {
            ...prevState.tasks,
            [taskName]: task
          },
          columns: {
            ...prevState.columns,
            [columnId]: {
              ...prevState.columns[columnId],
              taskIds: [...taskIds, task.id]
            }
          }
        };

        return newState;
      }
    })
  }

  // Update Task Title and Description
  const updateTask = (task: ITask, newTitle: string, newDescription: string) => {
    setBoards((prevState) => {
      if (prevState) {
        const newState = {
          ...prevState,
          tasks: {
            ...prevState.tasks,
            [task.id]: {
              ...task,
              title: newTitle,
              content: newDescription
            }
          }
        };

        return newState;
      }
    })
  }

  // Remove task from the Board
  const removeTask = (taskId: string, column: IColumn) => {
    setBoards((prevState) => {
      if (prevState) {
        const updatedTaskIds = column.taskIds.filter((id: string) => id !== taskId);
        const updatedTasks = Object.fromEntries(Object.entries(prevState.tasks).filter(([key]) => key !== taskId));
        const newState = {
          ...prevState,
          tasks: updatedTasks,
          columns: {
            ...prevState.columns,
            [column.id]: {
              ...prevState.columns[column.id],
              taskIds: updatedTaskIds ? updatedTaskIds : []
            }
          }
        };

        return newState;
      }
    })
  }


  // Sort tasks by task keys
  const sortTasks = (sortType: string, column: IColumn) => {
    if (column.taskIds.length > 0) {
      setBoards((prevState) => {
        if (prevState) {
          const taskIds = column.taskIds;
          const sortedTasks: string[] = taskIds.sort((a, b) => {
            const curr = prevState.tasks[a][sortType];
            const next = prevState.tasks[b][sortType];

            if (curr > next) {
              return 1
            }
            if (curr < next) {
              return -1
            }
            return 0
          });
          const newState = {
            ...prevState,
            columns: {
              ...prevState?.columns,
              [column.id]: {
                ...prevState?.columns[column.id],
                taskIds: sortedTasks
              }
            }
          };

          return newState
        }
      })
    }
    return
  }

  // Updating DND Data state after dropping task into another column
  function onDragEndHandler(result: DropResult) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = boards?.columns[source.droppableId];
    const finish = boards?.columns[destination.droppableId];

    // if Drop board is the same do default manipulations
    if (start === finish) {
      const newTaskIds = start?.taskIds;
      newTaskIds?.splice(source.index, 1);
      newTaskIds?.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      setBoards((prevState) => {
        if (prevState) {
          const newColumnId = newColumn.id;
          const newState = {
            ...prevState,
            columns: {
              ...prevState.columns,
              [newColumnId]: newColumn
            }
          }
          return newState
        }
      })
      return
    }

    // Moving from one list to another
    const startTaskIds = start?.taskIds;
    startTaskIds?.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = finish?.taskIds;
    finishTaskIds?.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    setBoards((prevState) => {
      if (prevState) {
        const newStartId = newStart.id;
        const newFinishId = newFinish.id;

        const newState = {
          ...prevState,
          columns: {
            ...prevState?.columns,
            [newStartId]: newStart,
            [newFinishId]: newFinish
          }
        };
        return newState
      }
    })
  }

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
