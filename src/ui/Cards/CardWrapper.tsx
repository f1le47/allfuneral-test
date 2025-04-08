import { ReactElement } from "react";
import s from "./CardWrapper.module.scss";

export interface ICardWrapper {
  children: ReactElement;
  title: string;
  buttonSlot: ReactElement;
}

export const CardWrapper = ({ children, title, buttonSlot }: ICardWrapper) => {
  return (
    <div className={s.cardWrapper}>
      <div className={s.title}>
        <h2 className={s.title__text}>{title}</h2>
        {buttonSlot}
      </div>
      <div className={s.body}>{children}</div>
    </div>
  );
};
