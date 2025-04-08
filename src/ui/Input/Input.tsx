import s from "./Input.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...rest }: Props) => {
  return <input className={s.input} {...rest} />;
};
