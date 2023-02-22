import { updateObject } from "../../../utils/objectUtils";
import { TabHorizonArea, TabLocation, TabsContentRect } from "../types";
import { checkIfTabExists, checkValidTargetPosition } from "./check";
import { getResizedAreaPosition } from "./getAreaPosition";
import { getTargetLocation, getTargetTabLocation } from "./getLocation";

export function updateCurrentTabIndexInAreaList(
  tabHorizonAreaList: TabHorizonArea[], 
  targetTabLocation: TabLocation
): TabHorizonArea[] {

  if(!checkIfTabExists(tabHorizonAreaList, targetTabLocation)) {
    return tabHorizonAreaList;
  }

  const {
    targetTabHorizonAreaIdx,
    targetTabVerticalAreaIdx,
    targetTabIdx
  } = getTargetTabLocation(targetTabLocation);

  return tabHorizonAreaList.map((horizonArea, horizonIdx) => {
    
    if(horizonIdx !== targetTabHorizonAreaIdx) {
      return horizonArea;
    }

    const verticalAreaList = horizonArea.verticalAreaList.map((verticalArea, verticalIdx) => {

      if(
        verticalIdx !== targetTabVerticalAreaIdx
        || !verticalArea.tabList[targetTabIdx]
      ) {
        return verticalArea;
      }
    
      return updateObject(verticalArea, { currentTabIndex: targetTabIdx });
    });

    return updateObject(horizonArea, { verticalAreaList });
  });
}

export function updateAreaPositionInAreaList(
  tabHorizonAreaList: TabHorizonArea[],
  targetTabLocation: [number] | [number, number],
  targetAreaPosition: number,
  tabsContentRect: TabsContentRect
): TabHorizonArea[] {

  const {
    targetTabHorizonAreaIdx,
    targetTabVerticalAreaIdx
  } = getTargetLocation(targetTabLocation);

  return tabHorizonAreaList.map((horizonArea, horizonIdx) => {

    if(horizonIdx !== targetTabHorizonAreaIdx) {
      return horizonArea;
    }

    if(targetTabVerticalAreaIdx === undefined) {
      
      if(!checkValidTargetPosition(tabHorizonAreaList, targetTabHorizonAreaIdx, tabsContentRect.width, targetAreaPosition)) {
        return horizonArea;
      }

      return updateObject(horizonArea, { areaPosition: targetAreaPosition });
    }

    const verticalAreaList = horizonArea.verticalAreaList.map((verticalArea, verticalIdx) => {

      if(
        verticalIdx !== targetTabVerticalAreaIdx
        || !checkValidTargetPosition(horizonArea.verticalAreaList, targetTabVerticalAreaIdx, tabsContentRect.height, targetAreaPosition)
      ) {
        return verticalArea;
      }

      return updateObject(verticalArea, { areaPosition: targetAreaPosition });
    });

    return updateObject(horizonArea, { verticalAreaList });
  })
}

export function resizeAreaPositionInList(
  tabsHorizonAreaList: TabHorizonArea[],
  preTabsContentRect: TabsContentRect,
  newTabsContentRect: TabsContentRect
) {

  const {
    width: previousWidth,
    height: previousHeight
  } = preTabsContentRect;

  const {
    width: targetWidth,
    height: targetHeight
  } = newTabsContentRect;

  return tabsHorizonAreaList.map(horizonArea => {

    const horioznAreaPosition = getResizedAreaPosition(
                                  horizonArea.areaPosition,
                                  previousWidth,
                                  targetWidth
                                );

    const verticalAreaList = horizonArea.verticalAreaList.map(verticalArea => {
      
      const verticalAreaPosition = getResizedAreaPosition(
                                     verticalArea.areaPosition,
                                     previousHeight,
                                     targetHeight
                                   );

      return updateObject(verticalArea, { 
        areaPosition: verticalAreaPosition
      });
    });

    return updateObject(horizonArea, {
      areaPosition: horioznAreaPosition,
      verticalAreaList
    });
  });
}