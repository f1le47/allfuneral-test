import s from "./MainMenu.module.scss";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as Organizations } from "../../assets/icons/orgs.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as Settings } from "../../assets/icons/settings.svg";
import { ReactComponent as Exit } from "../../assets/icons/exit.svg";
import { NavLink } from "react-router-dom";
import { Paths } from "../../providers/Router/consts";

export const MainMenu = () => {
  return (
    <header className={s.wrapper}>
      <div className={s.menu}>
        <Logo />
        <nav className={s.nav}>
          <NavLink to={Paths.Organization} className={({ isActive }) => (isActive ? s.active : "")}>
            <Organizations className={s.icon} />
          </NavLink>
          <NavLink to={Paths.Any}>
            <Search className={s.icon} />
          </NavLink>
        </nav>
        <div className={s.adds}>
          <div className={s.separator}></div>
          <Settings className={s.icon} />
          <Exit className={s.icon} />
        </div>
      </div>
    </header>
  );
};
