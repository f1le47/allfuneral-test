import { ReactElement } from "react";
import s from "./IconButton.module.scss";

interface Props {
  icon: ReactElement;
  className?: string;
}

export const IconButton = ({ icon, className }: Props) => {
  return <div className={`${s.icon} ${className ?? ""}`}>{icon}</div>;
};
