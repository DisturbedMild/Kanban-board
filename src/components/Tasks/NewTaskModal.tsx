import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Modal from '../ui/Modal';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

import type { ITask } from '../types/types';
import type { DialogRefType } from '../ui/types';

type NewTaskModalProps = { 
  dialog: React.RefObject<DialogRefType>;
  columnId: string;
  createNewTaskHandler: (task: ITask, newTaskName: string, columnId: string) => void;
}

const NewTaskModal = ({ dialog, createNewTaskHandler, columnId }: NewTaskModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const newTaskTitleRef = useRef<HTMLInputElement>(null);
  const newTaskDescriptionRef = useRef<HTMLInputElement>(null);
  const newTaskAuthorRef = useRef<HTMLInputElement>(null);
  const newTaskDateRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newTaskId = uuidv4();
    const newTask = {
      id: newTaskId,
      title: newTaskTitleRef.current?.value || '',
      content: newTaskDescriptionRef.current?.value || '',
      author: newTaskAuthorRef.current?.value || '',
      date: newTaskDateRef.current?.value || ''
    }

    createNewTaskHandler(newTask, newTaskId, columnId)
    
    formRef.current?.reset();
    dialog.current?.closeDialog()
  }

  return (
    <Modal titleCaption='New Task' modalId='create-task' className='bg-neutral-200 w-4/12 h-max p-4 rounded animate-slide-in-from-top text-neutral-900' formRef={formRef} ref={dialog}>
      <form className='w-full flex flex-col items-center' ref={formRef} onSubmit={onSubmitHandler}>
        <Input type='text' placeholderValue='Task title...' className='w-full mb-4 px-2 py-1 bg-white outline-none' inputRef={newTaskTitleRef} required />
        <TextArea placeholderValue='Task description...' className='w-full h-20 mb-4 px-2 bg-white outline-none resize-none' textareaRef={newTaskDescriptionRef} />
        <Input type='text' placeholderValue='Task author...' className='w-full mb-4 px-2 py-1 bg-white outline-none' inputRef={newTaskAuthorRef} required />
        <Input type='date' className='w-full mb-4 px-2 py-1 bg-white outline-none' inputRef={newTaskDateRef} min='2023-01-01' max='2025-12-31' required />
        <Button className='ml-auto px-2 py-1 border-2 border-teal-900 text-white bg-teal-900 hover:bg-neutral-600 hover:border-neutral-600 transition-all rounded'>Create</Button>
      </form>
    </Modal>
  )
};

export default NewTaskModal;