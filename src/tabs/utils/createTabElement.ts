import { ReactElement } from "react";
import { TabElement, TabElementProps } from "..";
import { TabStyle } from "../store/stucts/types";
import { updateObject } from "./objectUtils";

type Element = ({ useTabsStoreHooks, tabLocation }: TabElementProps) => ReactElement;

interface CreateTabElementProps {
  style?: TabStyle;
  icon?: any;
  isInAddMenu?: boolean;
  isMemorizeTab?: boolean;
  rightUtilsElement?: Element;
  leftUtilsElement?: Element;
}

const defaultTabElementProps: CreateTabElementProps = {
  isMemorizeTab: true,
  isInAddMenu: true
}

export default function createTabElement(
  element: Element,
  title: string = "tab", 
  props?: CreateTabElementProps
): TabElement {

  const tabElementProps = updateObject<CreateTabElementProps>(defaultTabElementProps, props? props : {});

  return {
    title,
    element,
    ...tabElementProps
  }
}