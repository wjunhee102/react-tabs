import { TabLocation } from "../store/stucts/types";

export function getTabIndex(
  currentTabLocation: TabLocation,
  targetTabLocation: TabLocation
): number {

  if(
    currentTabLocation[0] === targetTabLocation[0]
    && currentTabLocation[1] === targetTabLocation[1]
    && currentTabLocation[2] < targetTabLocation[2] 
  ) {
    return targetTabLocation[2] - 1;
  }

  return  targetTabLocation[2];
}