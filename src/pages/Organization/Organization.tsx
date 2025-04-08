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
import { OrganizationPatch } from "../../stores/organizationStore/types";
import { BlurLoader } from "../../ui/BlurLoader/BlurLoader";
import { contactStore } from "../../stores/contactStore/contactStore";
import { Contacts } from "../../components/Contacts/Contacts";
import { Photos } from "../../components/Photos/Photos";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const Organization = observer(() => {
  const {
    isLoading: isOrganizationLoading,
    organization,
    getOrganization,
    saveOrganization,
    removeOrganization,
    deletePhoto,
    addPnoto,
  } = organizationStore;
  const { contact, getContact, saveContact, isLoading: isContactLoading } = contactStore;
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isRemoveOrg, setIsRemoveOrg] = useState<boolean>(false);

  const [name, setName] = useState<string>(organization?.name ?? "");

  useEffect(() => {
    getOrganization("12");
  }, [getOrganization]);

  useEffect(() => {
    if (organization) {
      setName(organization.name);
      getContact(organization.contactId);
    }
  }, [getContact, organization]);

  if (!organization || !contact) return <></>;

  const handleSave = async () => {
    const org: OrganizationPatch = {
      name: name,
      shortName: name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join(""),
    };
    await saveOrganization(organization.id, org);
    setIsEditName(false);
  };
  const handleDelete = async () => {
    await removeOrganization(organization.id);
    setIsRemoveOrg(false);
  };

  return (
    <>
      <BlurLoader isLoading={isOrganizationLoading || isContactLoading}>
        <main className={s.page}>
          <Sidebar />
          <div className={s.container}>
            <div className={s.pageHeader}>
              <IconButton className={s.back} icon={<Back />} />
              <h1 className={s.title}>{organization.name}</h1>
              <div className={s.buttons}>
                <IconButton icon={<Edit onClick={() => setIsEditName(true)} />} />
                <IconButton
                  icon={<Trash onClick={() => setIsRemoveOrg(true)} className={s.trash} />}
                />
              </div>
            </div>
            <div className={s.cards}>
              <CompanyDetails organization={organization} saveOrganization={saveOrganization} />
              <Contacts contact={contact} saveContact={saveContact} />
              <Photos organization={organization} deletePhoto={deletePhoto} addPhoto={addPnoto} />
            </div>
          </div>
        </main>
      </BlurLoader>
      {isEditName && (
        <DialogBox
          applyText="Save changes"
          cancelText="Cancel"
          onApply={handleSave}
          onCancel={() => setIsEditName(false)}
          title="Specify the Organization's name">
          <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </DialogBox>
      )}
      {isRemoveOrg && (
        <DialogBox
          applyText="Yes, remove"
          cancelText="No"
          onApply={handleDelete}
          onCancel={() => setIsRemoveOrg(false)}
          title="Specify the Organization's name">
          <p className={s.removeDescription}>Are you sure you want to remove this Organozation?</p>
        </DialogBox>
      )}
    </>
  );
});
