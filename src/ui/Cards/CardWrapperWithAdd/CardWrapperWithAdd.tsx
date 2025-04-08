import { Button } from "../../Button/Button";
import { CardWrapper, ICardWrapper } from "../CardWrapper";
import { ReactComponent as Add } from "../../../assets/icons/add.svg";
import { ButtonSizes, ButtonVariants } from "../../Button/types";
import { ChangeEvent, useRef } from "react";

interface Props extends Omit<ICardWrapper, "buttonSlot"> {
  onChangeFile: (file: File | null) => void;
  accept?: string;
}

export const CardWrapperWithAdd = ({ children, title, onChangeFile, accept }: Props) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    fileInput.current?.click();
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e?.target.files?.[0] || null;
    onChangeFile(selectedFile);
  };

  const button = (
    <div>
      <Button
        icon={<Add />}
        variant={ButtonVariants.Outline}
        size={ButtonSizes.Flattened}
        onClick={handleAdd}>
        Add
      </Button>
      <input
        ref={fileInput}
        type="file"
        style={{ display: "none" }}
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
  return (
    <CardWrapper title={title} buttonSlot={button}>
      {children}
    </CardWrapper>
  );
};
