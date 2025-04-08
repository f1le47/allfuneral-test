import { ReactElement } from "react";
import s from "./DialogBox.module.scss";
import { Button } from "../Button/Button";
import { ButtonVariants } from "../Button/types";
import { createPortal } from "react-dom";

interface Props {
  applyText: string;
  onApply: () => void;
  cancelText: string;
  onCancel: () => void;
  title: string;
  children: ReactElement;
}

export const DialogBox = ({ applyText, cancelText, children, onApply, onCancel, title }: Props) => {
  return createPortal(
    <div className={s.overlay}>
      <div className={s.dialogbox}>
        <p className={s.title}>{title}</p>
        <div className={s.children}>{children}</div>
        <div className={s.buttons}>
          <Button variant={ButtonVariants.Outline} onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant={ButtonVariants.Filled} onClick={onApply}>
            {applyText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
