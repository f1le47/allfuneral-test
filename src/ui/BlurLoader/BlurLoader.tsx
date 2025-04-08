import s from "./BlurLoader.module.scss";
import { ReactComponent as Loader } from "../../assets/icons/loader.svg";
import { ReactElement, useEffect, useState } from "react";
import { DELAY_BEFORE_CLOSE_LOADER } from "./consts";

interface Props {
  children: ReactElement;
  isLoading: boolean;
}

export const BlurLoader = ({ isLoading, children }: Props) => {
  const [innerIsLoading, setInnerIsLoading] = useState<boolean>(isLoading);

  useEffect(() => {
    if (isLoading) setInnerIsLoading(true);
    else setTimeout(() => setInnerIsLoading(false), DELAY_BEFORE_CLOSE_LOADER);
  }, [isLoading]);

  return (
    <div className={s.wrapper}>
      {children}
      {innerIsLoading && (
        <div className={s.loader}>
          <Loader className={s.icon} />
        </div>
      )}
    </div>
  );
};
