import { TabHorizonArea, TabVeticalArea } from "../types";

export function getNewAreaPosition(
  preAreaPosition: number, 
  nextAreaPosition: number,
  divisor: number = 2
): number {
  return Math.floor((preAreaPosition + ((nextAreaPosition - preAreaPosition) / divisor)));
}

export function getNextAreaPosition(
  nextArea: TabHorizonArea | TabVeticalArea,
  contentRect: number
) {
  return nextArea? nextArea.areaPosition : contentRect;
}

export function getTargetAreaPosition<T extends TabHorizonArea | TabVeticalArea>(
  areaList: T[],
  targetIdx: number,
  contentRect: number
): number {
  
  const preArea = areaList[targetIdx];
  const nextIdx = targetIdx + 1;
  
  if(!preArea) return 0;
  
  const nextArea = areaList[nextIdx];

  const preAreaPosition  = preArea.areaPosition;
  const nextAreaPosition = getNextAreaPosition(nextArea, contentRect);

  return getNewAreaPosition(preAreaPosition, nextAreaPosition);
}

export function getBasedAreaPosition<T extends TabHorizonArea | TabVeticalArea>(
  areaList: T[],
  contentRect: number
): number {

  const areaListLength = areaList.length;

  return Math.floor(contentRect / areaListLength);
}

export function getBasedAreaPositionFix<T extends TabHorizonArea | TabVeticalArea>(
  areaList: T[],
  contentRect: number
): number {

  const areaListLength = areaList.length + 0.7;

  return Math.floor(contentRect / areaListLength);
}

export function getResizedAreaPosition(
  areaPosition: number,
  preContentRect: number,
  targetContentRect: number
) {
  return Math.floor(targetContentRect * (areaPosition / preContentRect));
}