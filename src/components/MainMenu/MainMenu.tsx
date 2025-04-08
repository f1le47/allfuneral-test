import s from "./MainMenu.module.scss";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as Organizations } from "../../assets/icons/orgs.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as Settings } from "../../assets/icons/settings.svg";
import { ReactComponent as Exit } from "../../assets/icons/exit.svg";

export const MainMenu = () => {
  return (
    <header className={s.menu}>
      <Logo />
      <nav className={s.nav}>
        <Organizations className={s.icon} />
        <Search className={s.icon} />
      </nav>
      <div className={s.adds}>
        <div className={s.separator}></div>
        <Settings className={s.icon} />
        <Exit className={s.icon} />
      </div>
    </header>
  );
};
