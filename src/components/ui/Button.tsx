import type { ButtonProps } from "./types";

export default function Button({ className, children, onClick }: ButtonProps) {
  return <button className={className} onClick={onClick}>{children}</button>
}