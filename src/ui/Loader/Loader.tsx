import { ReactComponent as LoaderIcon } from "../../assets/icons/loader.svg";
import s from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={s.loader}>
      <LoaderIcon />
    </div>
  );
};
