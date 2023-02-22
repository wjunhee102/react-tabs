import { Tab, TabHorizonArea, TabLocation, TabVeticalArea } from "../types";
import { getTargetTabLocation } from "./getLocation";


export function checkIfTabExists(
  tabHorizonAreaList: TabHorizonArea[],
  targetTabLocation: TabLocation
): Tab | null {

  const {
    targetTabHorizonAreaIdx,
    targetTabVerticalAreaIdx,
    targetTabIdx
  } = getTargetTabLocation(targetTabLocation);

  const horizonArea = tabHorizonAreaList[targetTabHorizonAreaIdx];

  if(!horizonArea) return null;

  const vertialArea = horizonArea.verticalAreaList[targetTabVerticalAreaIdx];

  if(!vertialArea) return null;

  const tab = vertialArea.tabList[targetTabIdx];

  if(!tab) return null;

  return tab;
}

export function checkValidTargetPosition<T extends TabHorizonArea | TabVeticalArea>(
  areaList: T[],
  targetIdx: number,
  contentRect: number,
  targetAreaPosition: number
): boolean {

  const preArea = areaList[targetIdx - 1];
  const nextArea = areaList[targetIdx + 1];

  const preAreaPosition = preArea? preArea.areaPosition : 0;
  const nextAreaPosition = nextArea? nextArea.areaPosition : contentRect;

  if(
    preAreaPosition >= targetAreaPosition
    || nextAreaPosition <= targetAreaPosition
  ) {
    return false;
  }
  
  return true;
}