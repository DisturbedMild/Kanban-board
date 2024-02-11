import { useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '../ui/Button';
import HeaderModal from './HeaderModal';

import type { DialogRefType } from '../ui/types';

export type HeaderProps = {
  initNewProjectHandler: (id: string, title: string) => void;
};

const Header = ({ initNewProjectHandler }: HeaderProps) => {
  const dialog = useRef<DialogRefType>(null);
  const modalElement = document.getElementById('modal');

  function createProjectHandler() {
    dialog.current?.openDialog();
  }

  return (
    <>
      {modalElement && createPortal(<HeaderModal initNewProjectHandler={initNewProjectHandler} dialog={dialog} />, modalElement)}
      <header id='header' className='border-b-2 border-neutral-700'>
        <div className='container mx-auto py-4'>
          <Button className='px-4 py-2 bg-neutral-700 rounded hover:bg-neutral-500 transition-all' onClick={createProjectHandler}>Create Project</Button>
        </div>
      </header>
    </>
  )
};

export default Header;
