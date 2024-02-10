import type { InputProps } from "./types";

export default function Input({ inputId, type, inputName, placeholderValue, className, inputRef, value, onChange, onKeyDown, onBlur, autoFocus, required, min, max }: InputProps) {
  return (<input
    id={inputId}
    type={type ? type : "text"}
    name={inputName}
    placeholder={placeholderValue}
    className={className}
    ref={inputRef}
    value={value}
    min={min}
    max={max}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onBlur={onBlur}
    autoFocus={autoFocus ? true : false}
    required={required ? true : false}
  />)
};