import { ChangeEvent } from "react";
import { Input } from "../../ui/Input/Input";
import s from "./Contacts.module.scss";

interface Props {
  isEdit: boolean;
  responsiblePerson: { value: string; onChange: (value: string) => void };
  phoneNumber: { value: string; onChange: (value: string) => void };
  email: { value: string; onChange: (value: string) => void };
}

export const ContactsEdit = ({ email, isEdit, phoneNumber, responsiblePerson }: Props) => {
  return (
    <div className={`${s.fields} ${isEdit ? s.edit : ""}`}>
      <div className={s.field}>
        <span className={s.key}>Responsible person:</span>
        <Input
          value={responsiblePerson.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            responsiblePerson.onChange(e.target.value)
          }
        />
      </div>
      <div className={s.field}>
        <span className={s.key}>Phone number:</span>
        <Input
          value={phoneNumber.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => phoneNumber.onChange(e.target.value)}
        />
      </div>
      <div className={s.field}>
        <span className={s.key}>E-mail:</span>
        <Input
          value={email.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => email.onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
