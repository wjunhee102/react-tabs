import { Tab, TabHorizonArea, TabLocation } from "../types";
import { checkIfTabExists } from "./check";
import { getTargetTabLocation } from "./getLocation";

export function getTabInList(
  tabHorizonAreaList: TabHorizonArea[],
  targetTabLocation: TabLocation 
): Tab | null {

  if(!checkIfTabExists(tabHorizonAreaList, targetTabLocation)) {
    return null
  }

  const {
    targetTabHorizonAreaIdx,
    targetTabVerticalAreaIdx,
    targetTabIdx
  } = getTargetTabLocation(targetTabLocation);

  const targetTab = tabHorizonAreaList[targetTabHorizonAreaIdx]
                     .verticalAreaList[targetTabVerticalAreaIdx]
                     .tabList[targetTabIdx];

  return targetTab;
}