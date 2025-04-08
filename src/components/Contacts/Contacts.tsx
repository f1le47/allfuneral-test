import { useState } from "react";
import s from "./Contacts.module.scss";
import { ContactsEdit } from "./ContactsEdit";
import { Contact, ContactPatch } from "../../stores/contactStore/types";
import { formatPhoneNumber } from "../../common/utils/formatPhoneNumber";
import { CardWrapperWithEdit } from "../../ui/Cards/CardWrapperWithEdit/CardWrapperWithEdit";

interface Props {
  contact: Contact;
  saveContact: (id: string, contact: ContactPatch) => Promise<void>;
}

export const Contacts = ({ contact, saveContact }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [responsiblePerson, setResponsiblePerson] = useState<string>(
    contact.firstname + " " + contact.lastname,
  );
  const onChangeResponsiblePerson = (value: string) => setResponsiblePerson(value);

  const [phone, setPhone] = useState<string>(formatPhoneNumber(contact.phone) ?? contact.phone);
  const onChangePhone = (value: string) => setPhone(value);

  const [email, setEmail] = useState<string>(contact.email);
  const onChangeEmail = (value: string) => setEmail(value);

  const clearStates = () => {
    setResponsiblePerson(contact.firstname + " " + contact.lastname);
    setPhone(formatPhoneNumber(contact.phone) ?? contact.phone);
    setEmail(contact.email);
  };

  const handleEdit = () => setIsEdit(true);
  const handleSave = async () => {
    const [firstname, lastname] = responsiblePerson.split(" ");
    const contactPatch: ContactPatch = {
      firstname,
      lastname,
      email,
      phone: phone.replace(/\s|\+/gi, ""),
    };
    await saveContact(contact.id, contactPatch);
    setIsEdit(false);
  };
  const handleCancel = () => {
    setIsEdit(false);
    clearStates();
  };

  return (
    <CardWrapperWithEdit
      title="Contacts"
      isEdit={isEdit}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      handleSave={handleSave}>
      {isEdit ? (
        <ContactsEdit
          isEdit={isEdit}
          responsiblePerson={{ value: responsiblePerson, onChange: onChangeResponsiblePerson }}
          phoneNumber={{ value: phone, onChange: onChangePhone }}
          email={{ value: email, onChange: onChangeEmail }}
        />
      ) : (
        <div className={s.fields}>
          <div className={s.field}>
            <span className={s.key}>Responsible person:</span>
            <span className={s.value}>
              {contact.firstname} {contact.lastname}
            </span>
          </div>
          <div className={s.field}>
            <span className={s.key}>Phone number:</span>
            <span className={s.value}>{formatPhoneNumber(contact.phone) ?? contact.phone}</span>
          </div>
          <div className={s.field}>
            <span className={s.key}>E-mail:</span>
            <span className={s.value}>{contact.email}</span>
          </div>
        </div>
      )}
    </CardWrapperWithEdit>
  );
};
