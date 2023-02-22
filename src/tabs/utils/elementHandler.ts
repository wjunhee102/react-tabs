import { ReactNode } from "react";
import { TabElementTable } from "..";
import { UseTabsStoreType } from "../hooks/useTabsStore";
import { Tab, TabLocation } from "../store/stucts/types";

export function elementHandler(
  table: TabElementTable, 
  tab: Tab,
  useTabsStoreHooks: UseTabsStoreType,
  tabLocation: TabLocation,
  isCurrent: boolean
): ReactNode | null {

  const key = tab.type;

  if(table.hasOwnProperty(key)) {

    const { isMemorizeTab, element } = table[key];

    if(isCurrent) {
      return element({ useTabsStoreHooks, tabLocation });
    }

    return isMemorizeTab? element({ useTabsStoreHooks, tabLocation }) : null;
  } 

  return null;
}