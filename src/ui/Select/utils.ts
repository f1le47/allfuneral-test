import { IOption } from "./types";

export function getSelectedOptions(options: IOption[]): string[] {
  return options.reduce((acc, curr) => {
    return curr.isChecked ? [...acc, curr.value] : acc
  }, [] as string[])
  
}