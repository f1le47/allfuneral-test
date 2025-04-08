import { useEffect, useRef, useState } from "react";
import s from "./Select.module.scss";
import { ReactComponent as Open } from "../../assets/icons/open.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { IOption } from "./types";
import { getSelectedOptions } from "./utils";

interface Props<T> {
  value: T;
  onChange: (value: T) => void;
  options: string[];
}

export function Select<T>({ value, onChange, options }: Props<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [innerOptions, setInnerOptions] = useState<IOption[]>(
    options.map((option, index) => ({
      id: index + option,
      value: option,
      isChecked: Array.isArray(value) ? value.includes(option) : option === value,
    })),
  );
  const selectRef = useRef<HTMLDivElement>(null);
  const isMultiselect = Array.isArray(value);

  const handleOverlay = (e: MouseEvent) => {
    if (!selectRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOverlay);

    return () => document.removeEventListener("click", handleOverlay);
  }, []);

  const handleClick = (option: IOption) => {
    if (isMultiselect) {
      setInnerOptions((prev) =>
        prev.map((opt) => (opt.id === option.id ? { ...opt, isChecked: !opt.isChecked } : opt)),
      );
    } else {
      setInnerOptions((prev) => prev.map((opt) => ({ ...opt, isChecked: opt.id === option.id })));
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const selectedOptions = getSelectedOptions(innerOptions);
    onChange(Array.isArray(value) ? (selectedOptions as T) : (selectedOptions.join("") as T));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerOptions]);

  const displayedValue = (Array.isArray(value) ? value.join(", ") : value) as string;

  return (
    <>
      <div className={s.select} ref={selectRef}>
        <div
          className={`${s.trigger} ${isOpen ? s.focus : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}>
          <span className={s.value}>{displayedValue}</span>
          {!isOpen ? <Open /> : <Close />}
        </div>
        {isOpen && (
          <div className={s.options}>
            {innerOptions.map((option) => (
              <div
                onClick={() => handleClick(option)}
                className={`${s.option} ${option.isChecked ? s.checked : ""}`}
                key={option.id}>
                {isMultiselect && (
                  <label className={s.checkbox}>
                    <input className={s.input} type="checkbox" checked={option.isChecked} />
                    <span className={s.checkmark}></span>
                  </label>
                )}
                <span className={s.value}>{option.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
