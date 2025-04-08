import { useState } from "react";
import { CardWrapper } from "../../ui/Cards/CardWrapper";
import {
  BusinessEntity,
  Organization,
  OrganizationPatch,
  OrgTypes,
} from "../../stores/organizationStore/types";
import s from "./CompanyDetails.module.scss";
import { CompanyDetailsEdit } from "./CompanyDetailsEdit";

interface Props {
  organization: Organization;
  saveOrganization: (id: string, organization: OrganizationPatch) => Promise<void>;
}

export const CompanyDetails = ({ organization, saveOrganization }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dateObj = new Date(organization.contract.issue_date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  const [agreementNumber, setAgreementNumber] = useState<string>(organization.contract.no);
  const onChangeAgreementNumber = (value: string) => setAgreementNumber(value);

  const [date, setDate] = useState<string>(`${month}.${day}.${year}`);
  const onChangeDate = (value: string) => setDate(value);

  const [businessEntity, setBusinessEntity] = useState<string>(organization.businessEntity);
  const onChangeBusinessEntity = (value: string) => setBusinessEntity(value);

  const [companyType, setCompanyType] = useState<string[]>(organization.type);
  const onChangeCompanyType = (value: string[]) => setCompanyType(value);

  const clearStates = () => {
    setAgreementNumber(organization.contract.no);
    setDate(`${month}.${day}.${year}`);
    setBusinessEntity(organization.businessEntity);
    setCompanyType(organization.type);
  };

  const handleEdit = () => setIsEdit(true);
  const handleSave = async () => {
    const org: OrganizationPatch = {
      contract: { no: agreementNumber, issue_date: new Date(date).toISOString() },
      businessEntity: businessEntity as BusinessEntity,
      type: companyType as OrgTypes[],
    };
    await saveOrganization(organization.id, org);
    setIsEdit(false);
  };
  const handleCancel = () => {
    setIsEdit(false);
    clearStates();
  };

  return (
    <CardWrapper
      title="Company Details"
      isEdit={isEdit}
      handleEdit={handleEdit}
      handleSave={handleSave}
      handleCancel={handleCancel}>
      {isEdit ? (
        <CompanyDetailsEdit
          isEdit={isEdit}
          agreementNumber={{ value: agreementNumber, onChange: onChangeAgreementNumber }}
          date={{ value: date, onChange: onChangeDate }}
          businessEntity={{ value: businessEntity, onChange: onChangeBusinessEntity }}
          companyType={{ value: companyType, onChange: onChangeCompanyType }}
        />
      ) : (
        <div className={s.fields}>
          <div className={s.field}>
            <span className={s.key}>Agreement:</span>
            <span className={s.value}>
              {organization.contract.no} / {`${month}.${day}.${year}`}
            </span>
          </div>
          <div className={s.field}>
            <span className={s.key}>Business entity:</span>
            <span className={s.value}>{organization.businessEntity}</span>
          </div>
          <div className={s.field}>
            <span className={s.key}>Company type:</span>
            <span className={s.value}>{organization.type}</span>
          </div>
        </div>
      )}
    </CardWrapper>
  );
};
