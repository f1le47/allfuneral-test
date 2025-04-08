import { useEffect, useState } from "react";
import { Organization } from "../../stores/organizationStore/types";
import { CardWrapperWithAdd } from "../../ui/Cards/CardWrapperWithAdd/CardWrapperWithAdd";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import s from "./Photos.module.scss";
import { Button } from "../../ui/Button/Button";
import { ButtonVariants } from "../../ui/Button/types";

interface Props {
  organization: Organization;
  deletePhoto: (id: string, imageName: string) => Promise<void>;
  addPhoto: (id: string, photoFile: File) => Promise<void>;
}

export const Photos = ({ organization, deletePhoto, addPhoto }: Props) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const onChangePhoto = (file: File | null) => setPhoto(file);

  useEffect(() => {
    if (!photo) return;
    addPhoto(organization.id, photo);
    setPhoto(null);
  }, [addPhoto, organization.id, photo]);

  return (
    <>
      <CardWrapperWithAdd
        title="Photos"
        onChangeFile={onChangePhoto}
        accept={"image/png, image/jpeg"}>
        <div className={s.photos}>
          {organization.photos.map((photo) => (
            <div className={s.photo} key={photo.name}>
              <img src={photo.thumbpath} alt={photo.name} className={s.img} />
              <div className={s.button} onClick={() => deletePhoto(organization.id, photo.name)}>
                <Button variant={ButtonVariants.Filled} icon={<Trash />} className={s.btn} />
              </div>
            </div>
          ))}
        </div>
      </CardWrapperWithAdd>
    </>
  );
};
