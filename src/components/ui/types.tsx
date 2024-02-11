export type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export interface InputRefType {
  value: string
}

export interface DialogRefType {
  openDialog: () => void;
  closeDialog: () => void;
}

export interface InputProps {
  inputId?: string;
  type: string;
  min?: string;
  max?: string;
  inputName?: string;
  placeholderValue?: string;
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  value?: string;
  required?: boolean;
  autoFocus?: boolean;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?(e: React.KeyboardEvent<HTMLInputElement>): void;
}

export type ModalProps = {
  titleCaption: string;
  modalId: string;
  className?: string;
  children?: React.ReactNode;
  formRef?: React.RefObject<HTMLFormElement>;
}

export interface TextAreaProps {
  id?: string;
  name?: string;
  placeholderValue?: string;
  className?: string;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  value?: string;
  required?: HTMLTextAreaElement;
  rows?: number;
  wrap?: string;
  autoFocus?: boolean;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?(e: React.KeyboardEvent<HTMLElement>): void;
}