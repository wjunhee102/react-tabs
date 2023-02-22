import { TabLocation } from "../types";

export function getTargetLocation(
  targetTabLocation: [number] | [number, number] | TabLocation
) {
  return {
    targetTabHorizonAreaIdx: targetTabLocation[0],
    targetTabVerticalAreaIdx: targetTabLocation[1],
    targetTabIdx: targetTabLocation[2]
  }
}

export function getTabLocation(
  targetTabLocation: [number] | [number, number] | TabLocation
): TabLocation {
  return [
    targetTabLocation[0],
    targetTabLocation[1]? targetTabLocation[1] : 0,
    targetTabLocation[2]? targetTabLocation[2] : 0
  ]
}

export function getTargetTabLocation(
  targetTabLocation: TabLocation
) {
  return {
    targetTabHorizonAreaIdx: targetTabLocation[0],
    targetTabVerticalAreaIdx: targetTabLocation[1],
    targetTabIdx: targetTabLocation[2]
  }
}

export function getRemovedTabLocation(
  currentTabLocation: TabLocation,
  targetTabLocation: [number] | [number, number] | TabLocation
): TabLocation {

  const {
    targetTabHorizonAreaIdx,
    targetTabVerticalAreaIdx,
    targetTabIdx
  } = getTargetLocation(targetTabLocation);

  if(targetTabVerticalAreaIdx === undefined || targetTabIdx === undefined) {
    return currentTabLocation;
  }
  
  if(
    currentTabLocation[0] === targetTabHorizonAreaIdx
    && currentTabLocation[1] === targetTabVerticalAreaIdx
    && currentTabLocation[2] > targetTabIdx
  ) {
    return [currentTabLocation[0], currentTabLocation[1], currentTabLocation[2] + 1];
  }

  return currentTabLocation;
}