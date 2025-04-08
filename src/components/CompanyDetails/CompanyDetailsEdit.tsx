import s from "./CompanyDetails.module.scss";
import { BUSINESS_ENTITIES, ORG_TYPES } from "./consts";
import { Input } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import { ChangeEvent } from "react";

interface Props {
  isEdit: boolean;
  agreementNumber: { value: string; onChange: (value: string) => void };
  date: { value: string; onChange: (value: string) => void };
  businessEntity: { value: string; onChange: (value: string) => void };
  companyType: {
    value: string[];
    onChange: (value: string[]) => void;
  };
}

export const CompanyDetailsEdit = ({
  isEdit,
  agreementNumber,
  businessEntity,
  date,
  companyType,
}: Props) => {
  return (
    <div className={`${s.fields} ${isEdit ? s.edit : ""}`}>
      <div className={s.field}>
        <span className={s.key}>Agreement number:</span>
        <Input
          value={agreementNumber.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => agreementNumber.onChange(e.target.value)}
        />
        <span className={`${s.key} ${s.fit}`}>Date:</span>
        <Input
          value={date.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => date.onChange(e.target.value)}
        />
      </div>
      <div className={s.field}>
        <span className={s.key}>Business entity:</span>
        <Select
          value={businessEntity.value}
          onChange={businessEntity.onChange}
          options={BUSINESS_ENTITIES}
        />
      </div>
      <div className={s.field}>
        <span className={s.key}>Company type:</span>
        <Select value={companyType.value} onChange={companyType.onChange} options={ORG_TYPES} />
      </div>
    </div>
  );
};
