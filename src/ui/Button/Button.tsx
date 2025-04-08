import { ReactElement } from "react";
import s from "./Button.module.scss";
import { ButtonSizes, ButtonVariants } from "./types";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: string;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  icon?: ReactElement;
}

export const Button = ({
  children,
  variant = ButtonVariants.Filled,
  size = ButtonSizes.Default,
  icon,
  ...rest
}: Props) => {
  return (
    <button className={`${s.button} ${s[variant]} ${s[size]}`} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  );
};
