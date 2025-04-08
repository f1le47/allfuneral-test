import { ReactElement } from "react";
import s from "./CardWrapper.module.scss";
import { Button } from "../Button/Button";
import { ButtonSizes, ButtonVariants } from "../Button/types";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as Cancel } from "../../assets/icons/cancel.svg";
import { ReactComponent as Save } from "../../assets/icons/save.svg";

interface Props {
  children: ReactElement;
  title: string;
  isEdit: boolean;
  handleEdit: () => void;
  handleSave: () => void;
  handleCancel: () => void;
}

export const CardWrapper = ({
  children,
  title,
  isEdit,
  handleEdit,
  handleSave,
  handleCancel,
}: Props) => {
  return (
    <div className={s.cardWrapper}>
      <div className={s.title}>
        <h2 className={s.title__text}>{title}</h2>
        <div className={s.buttons}>
          {isEdit ? (
            <>
              <Button
                variant={ButtonVariants.Outline}
                size={ButtonSizes.Flattened}
                icon={<Save />}
                onClick={handleSave}>
                Save changes
              </Button>
              <Button
                variant={ButtonVariants.Outline}
                size={ButtonSizes.Flattened}
                icon={<Cancel />}
                onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant={ButtonVariants.Outline}
              size={ButtonSizes.Flattened}
              icon={<Edit />}
              onClick={handleEdit}>
              Edit
            </Button>
          )}
        </div>
      </div>
      <div className={s.body}>{children}</div>
    </div>
  );
};
