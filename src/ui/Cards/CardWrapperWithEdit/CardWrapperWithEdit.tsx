import { Button } from "../../Button/Button";
import { ButtonSizes, ButtonVariants } from "../../Button/types";
import { CardWrapper, ICardWrapper } from "../CardWrapper";
import { ReactComponent as Edit } from "../../../assets/icons/edit.svg";
import { ReactComponent as Cancel } from "../../../assets/icons/cancel.svg";
import { ReactComponent as Save } from "../../../assets/icons/save.svg";
import s from "./CardWrapperWithEdit.module.scss";

interface Props extends Omit<ICardWrapper, "buttonSlot"> {
  isEdit: boolean;
  handleEdit: () => void;
  handleSave: () => void;
  handleCancel: () => void;
}

export const CardWrapperWithEdit = ({
  children,
  handleCancel,
  handleEdit,
  handleSave,
  isEdit,
  title,
}: Props) => {
  const buttons = (
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
  );

  return (
    <CardWrapper title={title} buttonSlot={buttons}>
      {children}
    </CardWrapper>
  );
};
