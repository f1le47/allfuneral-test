import { Button } from "../../ui/Button/Button";
import { ButtonVariants } from "../../ui/Button/types";
import { ReactComponent as Orgs } from "../../assets/icons/orgs.svg";
import { ReactComponent as Contractors } from "../../assets/icons/contractors.svg";
import { ReactComponent as Clients } from "../../assets/icons/clients.svg";
import s from "./Sidebar.module.scss";

export const Sidebar = () => {
  return (
    <aside className={s.wrapper}>
      <div className={s.sidebar}>
        <div className={s.header}>
          <span className={s.title}>Oak Tree Cemetey</span>
          <span className={s.role}>Process Manager</span>
        </div>
        <div className={s.divider}></div>
        <div className={s.tabs}>
          <Button icon={<Orgs />}>Organizations</Button>
          <Button icon={<Contractors />} variant={ButtonVariants.Outline}>
            Contractors
          </Button>
          <Button icon={<Clients />} variant={ButtonVariants.Outline}>
            Clients
          </Button>
        </div>
        <span className={s.footer}>All Funeral Services © 2015-2025</span>
      </div>
    </aside>
  );
};
