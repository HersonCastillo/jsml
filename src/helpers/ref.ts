import { HTMLTag } from '../constants/tag.type';

export const ref = <T>(
  keyName: string,
  inputName: HTMLTag,
): T | Element | null => document.querySelector(`${inputName}[key='${keyName}']`);
