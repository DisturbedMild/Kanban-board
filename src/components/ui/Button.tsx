import type { ButtonProps } from "./types";

const Button = ({ className, children, onClick }: ButtonProps) => {
  return <button className={className} onClick={onClick}>{children}</button>
};

export default Button;
