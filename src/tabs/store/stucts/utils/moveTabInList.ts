import { updateObject } from "../../../utils/objectUtils";
import { TabHorizonArea, TabLocation } from "../types";
import { getTargetTabLocation } from "./getLocation";


export function moveTabInList(
  tabHorizonAreaList: TabHorizonArea[],
  currentTabLocation: TabLocation,
  targetTabLocation: TabLocation
): TabHorizonArea[] {

  if(!tabHorizonAreaList[0]) {
    return [];
  }

  const {
    targetTabHorizonAreaIdx: currentTabHorizonAreaIdx,
    targetTabVerticalAreaIdx: currentTabVerticalAreaIdx,
    targetTabIdx: currentTabIdx
  } = getTargetTabLocation(currentTabLocation);

  const {
    targetTabHorizonAreaIdx,
    targetTabVerticalAreaIdx,
    targetTabIdx
  } = getTargetTabLocation(targetTabLocation);

  if(
    currentTabHorizonAreaIdx !== targetTabHorizonAreaIdx
    && currentTabVerticalAreaIdx !== targetTabVerticalAreaIdx
  ) {
    return tabHorizonAreaList.map((horizonArea, horizonIdx) => {

      if(horizonIdx !== currentTabHorizonAreaIdx) {
        return horizonArea
      }

      const verticalAreaList = horizonArea.verticalAreaList.map((verticalArea, verticalIdx) => {

        if(currentTabVerticalAreaIdx !== verticalIdx) {
          return verticalArea;
        }

        return updateObject(verticalArea, { currentTabIndex: currentTabIdx });
      });

      return updateObject(horizonArea, { verticalAreaList });
    })
  }

  return tabHorizonAreaList.map((horizonArea, horizonIdx) => {

    if(horizonIdx !== currentTabHorizonAreaIdx) {
      return horizonArea
    }

    const verticalAreaList = horizonArea.verticalAreaList.map((verticalArea, verticalIdx) => {

      if(currentTabVerticalAreaIdx !== verticalIdx) {
        return verticalArea;
      }

      const preTabList    = verticalArea.tabList;
      const tabListLength = preTabList.length;
      const tabList = [];

      let currentTabIndex = currentTabIdx;

      for(let i = 0; i < tabListLength; i++) {

        if(i === currentTabIdx) {

          if(currentTabIdx === targetTabIdx) {
            tabList.push(preTabList[i]);
          }

          continue;
        }

        if(i === targetTabIdx) {

          currentTabIndex = i;

          if(targetTabIdx < currentTabIdx) {
            tabList.push(preTabList[currentTabIdx], preTabList[i]);
          } else {
            tabList.push(preTabList[i], preTabList[currentTabIdx]);
          }

          continue;
        }

        tabList.push(preTabList[i]);
      }

      if(targetTabIdx >= tabListLength) {
        tabList.push(preTabList[currentTabIdx]);
      }

      return updateObject(verticalArea, { 
                tabList,
                currentTabIndex 
             });
    });

    return updateObject(horizonArea, { verticalAreaList });
  })

}