import { useState } from "react";
import {
  BusinessEntity,
  Organization,
  OrganizationPatch,
} from "../../stores/organizationStore/types";
import s from "./CompanyDetails.module.scss";
import { CompanyDetailsEdit } from "./CompanyDetailsEdit";
import { convertType, getDateStringFromISO } from "./utils";
import { CardWrapperWithEdit } from "../../ui/Cards/CardWrapperWithEdit/CardWrapperWithEdit";

interface Props {
  organization: Organization;
  saveOrganization: (id: string, organization: OrganizationPatch) => Promise<void>;
}

export const CompanyDetails = ({ organization, saveOrganization }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formattedDate = getDateStringFromISO(organization.contract.issue_date);

  const [agreementNumber, setAgreementNumber] = useState<string>(organization.contract.no);
  const onChangeAgreementNumber = (value: string) => setAgreementNumber(value);

  const [date, setDate] = useState<string>(formattedDate);
  const onChangeDate = (value: string) => setDate(value);

  const [businessEntity, setBusinessEntity] = useState<string>(organization.businessEntity);
  const onChangeBusinessEntity = (value: string) => setBusinessEntity(value);

  const [companyType, setCompanyType] = useState<string[]>(
    convertType.toDisplay(organization.type),
  );
  const onChangeCompanyType = (value: string[]) => setCompanyType(value);

  const clearStates = () => {
    setAgreementNumber(organization.contract.no);
    setDate(formattedDate);
    setBusinessEntity(organization.businessEntity);
    setCompanyType(convertType.toDisplay(organization.type));
  };

  const handleEdit = () => setIsEdit(true);
  const handleSave = async () => {
    const org: OrganizationPatch = {
      contract: { no: agreementNumber, issue_date: new Date(date).toISOString() },
      businessEntity: businessEntity as BusinessEntity,
      type: convertType.fromDisplay(companyType),
    };
    await saveOrganization(organization.id, org);
    setIsEdit(false);
  };
  const handleCancel = () => {
    setIsEdit(false);
    clearStates();
  };

  const displayType = convertType.toDisplay(organization.type).join(", ");

  return (
    <CardWrapperWithEdit
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
              {organization.contract.no} / {formattedDate}
            </span>
          </div>
          <div className={s.field}>
            <span className={s.key}>Business entity:</span>
            <span className={s.value}>{organization.businessEntity}</span>
          </div>
          <div className={s.field}>
            <span className={s.key}>Company type:</span>
            <span className={s.value}>{displayType}</span>
          </div>
        </div>
      )}
    </CardWrapperWithEdit>
  );
};
