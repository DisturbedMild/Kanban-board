import { useRef, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

type NewTasksPlateProps = {
  createNewListHandler: (name: string) => void;
}

export default function AddNewTasksBoardPlate({ createNewListHandler }: NewTasksPlateProps) {
  const [addNewList, setAddNewList] = useState(false);
  const newListRef = useRef<HTMLInputElement>(null);

  const addNewListHandler = () => {
    setAddNewList(true)
  }

  const closeNewListHandler = () => {
    setAddNewList(false)
  }

  const onSubmitNewListHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (newListRef.current) {
      createNewListHandler(newListRef.current.value)
    }
    setAddNewList(false);
  }

  return (
    <>
      {!addNewList &&
        <Button
          className='w-60 h-max px-4 py-2 bg-neutral-400/10 hover:bg-neutral-700/100 transition-all text-left rounded-lg'
          onClick={addNewListHandler}
        >
          + Add new list
        </Button>}
      {addNewList &&
        <div>
          <form className='w-60 p-2 bg-neutral-900 rounded-lg' onSubmit={onSubmitNewListHandler}>
            <Input
              type='text'
              inputId='new-list'
              placeholderValue='Enter list title'
              inputName='new-list'
              inputRef={newListRef}
              required
              className='mb-2 px-2 py-1 w-full rounded'
            />
            <div className='flex gap-2'>
              <Button className='px-2 py-1 bg-teal-900 hover:bg-teal-900/50 transition-all rounded'>
                Add list
              </Button>
              <Button
                onClick={closeNewListHandler}
                className='px-2 py-1 bg-transparent hover:bg-neutral-500/50 transition-all rounded'
              >
                Close
              </Button>
            </div>
          </form>
        </div>
      }
    </>
  )
}
