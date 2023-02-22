import { Tab, TabHorizonArea, TabProperties, TabVeticalArea } from "../types";
import { getTargetAreaPosition } from "./getAreaPosition";

export function createTab(
  type: string, 
  props?: TabProperties
): Tab {
  return {
    type, 
    ...props
  }
}

export function createVerticalArea(
  tabList: Tab[], 
  areaPosition: number = 0,
  currentTabIndex: number = 0
): TabVeticalArea {
  return {
    tabList,
    areaPosition,
    currentTabIndex
  }
}

export function createHorizonArea(
  verticalAreaList: TabVeticalArea[], 
  areaPosition: number = 0,
): TabHorizonArea {
  return {
    verticalAreaList,
    areaPosition
  }
} 

export function createNewVerticalArea(
  tab: Tab | Tab[],
  areaPosition: number = 0
) {

  const newTab = Array.isArray(tab)? tab : [ tab ];

  return createVerticalArea(newTab, areaPosition);
}

export function createNewHorizonArea(
  tab: Tab | Tab[],
  areaPosition: number = 0
): TabHorizonArea {

  const newTab = Array.isArray(tab)? tab : [ tab ];

  return createHorizonArea([createVerticalArea(newTab)], areaPosition);
}

export function createInsertedAreaPositionInVerticalArea(
  tabVerticalAreaList: TabVeticalArea[],
  targetVerticalAreaIdx: number,
  targetTab: Tab | Tab[],
  tabsContentHeight: number
): TabVeticalArea {

  const targetAreaPosition = getTargetAreaPosition(
                              tabVerticalAreaList,
                              targetVerticalAreaIdx,
                              tabsContentHeight
                            );

  return createNewVerticalArea(targetTab, targetAreaPosition);
}

export function createInsertedAreaPositionInHorizonArea(
  tabHorizonAreaList: TabHorizonArea[],
  targetHorizonAreaIdx: number,
  targetTab: Tab | Tab[],
  tabsContentWidth: number
): TabHorizonArea {

  const targetAreaPosition = getTargetAreaPosition(
                              tabHorizonAreaList, 
                              targetHorizonAreaIdx, 
                              tabsContentWidth
                             );

  return createNewHorizonArea(targetTab, targetAreaPosition);
}