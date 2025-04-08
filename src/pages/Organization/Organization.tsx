import { useEffect, useState } from "react";
import { organizationStore } from "../../stores/organizationStore/organizationStore";
import { CompanyDetails } from "../../components/CompanyDetails/CompanyDetails";
import { observer } from "mobx-react-lite";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import s from "./Organization.module.scss";
import { IconButton } from "../../ui/IconButton/IconButton";
import { DialogBox } from "../../ui/DialogBox/DialogBox";
import { Input } from "../../ui/Input/Input";

export const Organization = observer(() => {
  const { isLoading, organization, getOrganization, saveOrganization } = organizationStore;
  const [isEditName, setIsEditName] = useState<boolean>(false);

  useEffect(() => {
    getOrganization("12");
  }, [getOrganization]);

  if (!organization) return <></>;

  return (
    <>
      <main className={s.page}>
        <div className={s.container}>
          <div className={s.pageHeader}>
            <IconButton className={s.back} icon={<Back />} />
            <h1 className={s.title}>{organization.name}</h1>
            <div className={s.buttons}>
              <Edit className={s.icon} onClick={() => setIsEditName(true)} />
              <Trash className={s.icon} />
            </div>
          </div>
          <div className={s.cards}>
            <CompanyDetails organization={organization} saveOrganization={saveOrganization} />
          </div>
        </div>
      </main>
      {isEditName && (
        <DialogBox
          applyText="Save changes"
          cancelText="Cancel"
          onApply={() => {}}
          onCancel={() => {}}
          title="Specify the Organization's name">
          <Input value={organization.name} />
        </DialogBox>
      )}
    </>
  );
});
