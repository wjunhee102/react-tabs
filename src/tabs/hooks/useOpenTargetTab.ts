import { useCallback } from "react";
import { Tab, TabLocation } from "../store/stucts/types";
import { WhereToLookTypes } from "../store/stucts/utils/findTabLocationInList";
import { UseTabsStoreType } from "./useTabsStore";

export interface OpenTargetTabOptions {
  actionPayload?: any | null
  createATab?: boolean;
  findATab?: boolean;
  whereToLook?: WhereToLookTypes;
}

export interface UseOpenTargetTabProps {
  useTabsStoreHooks: UseTabsStoreType;
  tabLocation?: TabLocation; 
}

export function useOpenTargetTab(
  {
    useTabsStoreHooks,
    tabLocation
  }: UseOpenTargetTabProps
) {

  const {
    onOpenTargetTab
  } = useTabsStoreHooks;

  return useCallback((
    targetTab: string | Tab,
    {
      actionPayload,
      createATab,
      findATab,
      whereToLook
    }: OpenTargetTabOptions
  ) => {
    onOpenTargetTab(targetTab, 
      {
        actionPayload,
        options: {
          currentTabLocation: tabLocation,
          createATab,
          findATab,
          whereToLook
        }
      }
    )
  }, [onOpenTargetTab, tabLocation]);
}