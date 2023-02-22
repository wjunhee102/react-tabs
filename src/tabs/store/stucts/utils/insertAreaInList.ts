import { Tab, TabHorizonArea, TabVeticalArea } from "../types";

export function insertAreaInList<T extends (TabHorizonArea | TabVeticalArea | Tab)>(
  targetAreaList: T[],
  targetArea: T | T[], 
  targetIndex: number,
  locatedBehindTarget: boolean = false
): T[] {
  
  const newTargetAreaList = targetAreaList.concat();

  const index = !locatedBehindTarget? targetIndex : targetIndex + 1;
  
  const newTargetArea = Array.isArray(targetArea)? targetArea : [ targetArea ];

  newTargetAreaList.splice(index, 0, ...newTargetArea);

  return newTargetAreaList;
}