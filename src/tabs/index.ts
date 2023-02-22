import { ReactElement } from "react";
import useStore, { UseTabsStoreType } from "./hooks/useTabsStore";
import { Tab, TabLocation, TabStyle } from "./store/stucts/types";
import Tabs from "./TabsContainer";
import { createDefaultTabList } from "./utils/createDefaultTabList";
import createTabElement from "./utils/createTabElement";

export interface TabElementProps {
  useTabsStoreHooks: UseTabsStoreType;
  tabLocation: TabLocation;
}

type Element = ({ useTabsStoreHooks, tabLocation }: TabElementProps) => ReactElement;

export interface TabElement {
  title: string;
  element: Element;
  style?: TabStyle;
  icon?: any;
  isInAddMenu?: boolean;
  isMemorizeTab?: boolean;
  rightUtilsElement?: Element;
  leftUtilsElement?: Element;
  tooltipMessage?: string;
  tooltipMessageByAddButton?: string;
}

export type TabElementTable = {
  [P in string]: TabElement;
}

export type TabsProps = {
  tabElementTable: TabElementTable;
  useTabsStoreHooks?: UseTabsStoreType; 
  defaultTabList?: Tab[][][];
  id?: string | null;
  tooltipMessageByAddTabButton?: string | null;
  tooltipMessageByHosizonResizeBar?: string | null;
  tooltipMessageByVerticalResizeBar?: string | null;
  isSetAreaPostion?: boolean; 
  isSaveLocalStorage?: boolean;
  isActiveAddTabMenu?: boolean;
  isActiveAddTabListMenu?: boolean;
  isActiveDeleteTabButton?: boolean;
  isActiveDefaultUtilMenu?: boolean;
  isActiveTooltip?: boolean;
  isMemorizeTab?: boolean;
}

export const createTabElementByTabs     = createTabElement;
export const createDefaultTabListByTabs = createDefaultTabList;
export const useTabsStore               = useStore;

export default Tabs;