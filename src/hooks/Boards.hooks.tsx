import {useCallback, useEffect, useState} from "react";
import {IColumn, IData, ITask} from "../components/types/types.tsx";
import {v4 as uuidv4} from "uuid";
import {DropResult} from "react-beautiful-dnd";

function useBoard() {

  const [boards, setBoards] = useState<IData>({
    tasks: {},
    columns: {},
    columnOrder: []
  });

  // Creating new empty board list
  const createNewListHandler = useCallback((listTitle: string) => {
    setBoards((prevState) => {
      if (prevState) {

        const newState = { ...prevState };
        const columnId = uuidv4();

        newState.columns[columnId] = {
          id: columnId,
          title: listTitle,
          taskIds: []
        };
        newState.columnOrder.push(columnId);

        return newState
      } else {
        const columnName = uuidv4();

        return {
          tasks: {},
          columns: {
            [columnName]: {
              id: columnName,
              title: listTitle,
              taskIds: []
            }
          },
          columnOrder: [columnName]
        };
      }

    })
  }, [])

  const removeBoard = useCallback((columnId: string) => {
    setBoards((prevState) => {
      const updatedColumnOrder = prevState?.columnOrder.filter((id: string) => id !== columnId);
      const updatedColumn = Object.fromEntries(Object.entries(prevState.columns).filter(([key]) => key !== columnId));

      return {
        ...prevState,
        columns: updatedColumn,
        columnOrder: updatedColumnOrder,
      };
    })
  }, [])

  // Creating new Task
  const createNewTaskHandler = useCallback((task: ITask, taskName: string, columnId: string) => {
    setBoards((prevState) => {
      const taskIds = prevState?.columns[columnId].taskIds;

      return {
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
    })
  }, [])

  // Update Task Title and Description
  const updateTask = useCallback((task: ITask, newTitle: string, newDescription: string) => {
    setBoards((prevState) => {
      return {
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
    })
  }, [])

  // Remove task from the Board
  const removeTask = useCallback((taskId: string, column: IColumn) => {
    setBoards((prevState) => {
      const updatedTaskIds = column.taskIds.filter((id: string) => id !== taskId);
      const updatedTasks = Object.fromEntries(Object.entries(prevState.tasks).filter(([key]) => key !== taskId));
      return {
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
    })
  }, [])


  // Sort tasks by task keys
  const sortTasks = useCallback((sortType: string, column: IColumn) => {
    if (column.taskIds.length > 0) {
      setBoards((prevState) => {
        const taskIds = column.taskIds;
        const sortedTasks: string[] = taskIds.sort((a, b) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const curr = prevState.tasks[a][sortType];
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const next = prevState.tasks[b][sortType];

          if (curr > next) {
            return 1
          }
          if (curr < next) {
            return -1
          }
          return 0
        });
        return {
          ...prevState,
          columns: {
            ...prevState?.columns,
            [column.id]: {
              ...prevState?.columns[column.id],
              taskIds: sortedTasks
            }
          }
        }
      })
    }
    return
  }, [])

  // Updating DND Data state after dropping task into another column
  const onDragEndHandler = (result: DropResult) => {
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
        const newColumnId = newColumn.id;
        return {
          ...prevState,
          columns: {
            ...prevState.columns,
            [newColumnId]: newColumn
          }
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
      const newStartId = newStart.id;
      const newFinishId = newFinish.id;

      return {
        ...prevState,
        columns: {
          ...prevState?.columns,
          [newStartId]: newStart,
          [newFinishId]: newFinish
        }
      }
    })
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5173/")
      .then((res) => res.json())
      .then(data => setBoards(data))
  }, [])

  return {
    boards,
    onDragEndHandler,
    sortTasks,
    removeTask,
    createNewListHandler,
    updateTask,
    createNewTaskHandler,
    removeBoard
  }
}

export default useBoard;