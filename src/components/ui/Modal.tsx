import { Ref, forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button";

import type { DialogRefType, ModalProps } from "./types";

const Modal = forwardRef(function Modal({ titleCaption, modalId, className, formRef, children }: ModalProps, ref: Ref<DialogRefType>) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      openDialog() {
        dialog.current?.showModal();
      },
      closeDialog() {
        dialog.current?.close();
      }
    }
  })

  function onReset() {
    if (formRef) formRef.current?.reset();
    dialog.current?.close();
  }

  return (
    <dialog ref={dialog} id={modalId} className={className}>
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">{titleCaption}</h2>
        <form method="dialog" onSubmit={onReset} className="text-right">
          <Button className="px-3 py-1 border-2 border-neutral-900 rounded font-semibold hover:bg-neutral-800 hover:text-white transition-all">Close</Button>
        </form>
      </header>
      {children}
    </dialog>
  )
})

export default Modal;