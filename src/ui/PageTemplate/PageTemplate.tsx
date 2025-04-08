import { ReactElement } from "react";
import s from "./PageTemplate.module.scss";

interface Props {
  children: ReactElement;
}

export const PageTemplate = ({ children }: Props) => {
  return <div className={s.pageTemplate}>{children}</div>;
};
