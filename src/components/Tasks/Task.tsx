import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { XMarkIcon } from '@heroicons/react/20/solid';

import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

import type { IColumn, ITask } from '../types/types';

type TaskProps = {
  task: ITask;
  column: IColumn;
  index: number;
  updateTask: (task: ITask, taskTitle: string, taskDescription: string) => void;
  removeTask: (taskId: string, column: IColumn) => void;
}

const BoardItemTask = ({ column, task, index, updateTask, removeTask }: TaskProps) => {
  const [toggleTitleEditMode, setToggleTitleEditMode] = useState(false);
  const [toggleContentEditMode, setToggleContentEditMode] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(task.title);
  const [currentContent, setCurrentContent] = useState(task.content);

  const initTitleEditModeHandler = () => {
    setToggleTitleEditMode(true);
  }

  const initContentEditModeHandler = () => {
    setToggleContentEditMode(true);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentTitle || currentContent) {
        setToggleTitleEditMode(false);
        setToggleContentEditMode(false);
        updateTask(task, currentTitle, currentContent);
      }
    }
    if (e.key === 'Escape') {
      setCurrentTitle(task.title);
      setCurrentContent(task.content);
      setToggleTitleEditMode(false);
      setToggleContentEditMode(false);
    }
  }

  const onBlur = () => {
    setToggleTitleEditMode(false);
    setToggleContentEditMode(false);
  }

  const removeTaskHandler = () => {
    removeTask(task.id, column);
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
        return (
          <div className='relative flex flex-col grow px-2 py-1 bg-white text-black rounded'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {!toggleTitleEditMode &&
              <div className='flex justify-between gap-2 border-b-2 border-gray-400'>
                <h3
                  className={`${!toggleTitleEditMode ? 'line-clamp-2' : 'hidden'} pb-1 w-full text-md text-left leading-7 font-bold`}
                  onClick={initTitleEditModeHandler}>
                  {currentTitle ? currentTitle :
                    <span className='text-sm font-normal'>Enter new title...</span>
                  }
                </h3>
                <Button className='text-md text-left leading-7 font-bold' onClick={removeTaskHandler}>
                  <XMarkIcon className='-mr-1 h-5 w-5 text-black' />
                </Button>
              </div>}
            {toggleTitleEditMode &&
              <TextArea
                value={currentTitle ? currentTitle : ''}
                className={`${toggleTitleEditMode ? 'line-clamp-2' : 'hidden'} text-md text-left leading-7 bg-white outline-none w-48 resize-none font-bold border-b-2 border-gray-400`}
                rows={2}
                wrap="soft"
                onBlur={onBlur}
                onChange={({ target }) => setCurrentTitle(target.value)}
                onKeyDown={onKeyDown}
                autoFocus={true}
              />
            }
            {!toggleContentEditMode &&
              <p
                onClick={initContentEditModeHandler}
                className={`${!toggleContentEditMode ? 'line-clamp-3' : 'hidden'} pt-1 min-h-10`}
              >
                {currentContent ? currentContent : <span className='text-md text-gray-400'>Add your description</span>}
              </p>}
            {toggleContentEditMode && <TextArea
              value={currentContent ? currentContent : ''}
              className={`${toggleContentEditMode ? '' : 'hidden'} mt-1 h-32 text-md text-left bg-white outline-none w-48 resize-none`}
              rows={4}
              wrap="soft"
              onBlur={onBlur}
              onChange={({ target }) => setCurrentContent(target.value)}
              onKeyDown={onKeyDown}
              placeholderValue={!currentContent ? 'Add your description' : ''}
              autoFocus={true}
            />}
            <div className={`flex justify-between items-center mt-4 `}>
              <span>{task.author}</span>
              <span>{task.date}</span>
            </div>
          </div>
        )
      }}
    </Draggable>
  )
};

export default BoardItemTask;
