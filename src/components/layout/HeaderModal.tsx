import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';

import type { DialogRefType } from '../ui/types';

type HeaderModalProps = {
  initNewProjectHandler: (id: string, title: string) => void,
  dialog: React.RefObject<DialogRefType>
}

const HeaderModal = ({ initNewProjectHandler, dialog }: HeaderModalProps) => {
  const newProjectNameRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newProjectName = newProjectNameRef.current?.value ? newProjectNameRef.current.value : '';
    initNewProjectHandler(uuidv4(), newProjectName);
    dialog.current?.closeDialog();
  }

  return (
    <Modal
      titleCaption='Create Project'
      modalId='create-project'
      className='bg-neutral-200 w-4/12 h-60 p-4 rounded animate-slide-in-from-top text-neutral-900'
      ref={dialog}
    >
      <div className='flex flex-col mb-4'>
        <form action='submit' className='flex flex-col' onSubmit={onSubmitHandler}>
          <label htmlFor='newProjectName' className='mb-2'>Project Name:</label>
          <Input
            inputId='newProjectName'
            type='text'
            inputName='newProjectName'
            inputRef={newProjectNameRef}
            required
            className='mb-3 px-2 py-1 bg-transparent border-2 border-neutral-700 rounded'
          />
          <Button className='px-3 py-1 border-2 border-neutral-900 rounded font-semibold hover:bg-neutral-800 hover:text-white transition-all'>
            Create
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default HeaderModal;
