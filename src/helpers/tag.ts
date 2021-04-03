import { HTMLTag } from '../constants/tag.type';
import { Component, ComponentEvent } from '../interfaces';

interface TagProps {
  [prop: string]: string | string[] | boolean | number | ComponentEvent[];
}

export const tag = (
  htmlTagName: HTMLTag,
  components?: Component | Component[] | string | null,
  style?: CSSStyleDeclaration | null,
  props?: TagProps | null,
): Component => ({
  tag: htmlTagName,
  child: components!,
  style: style!,
  ...props,
});
