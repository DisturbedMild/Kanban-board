import type { TextAreaProps } from "./types";

export default function TextArea({ id, name, placeholderValue, className, textareaRef, value, rows, wrap, onChange, onKeyDown, onBlur, autoFocus, required }: TextAreaProps) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholderValue}
      className={className}
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      autoFocus={autoFocus ? true: false}
      required={required ? true: false}
      rows={rows}
      wrap={wrap}
    >
    </textarea>
  )
}