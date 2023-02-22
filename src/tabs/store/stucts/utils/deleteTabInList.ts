import { Tab, TabHorizonArea, TabLocation, TabVeticalArea } from "../types";
import { checkIfTabExists } from "./check";
import { updateObject } from "../../../utils/objectUtils";
import { getTargetLocation } from "./getLocation";


function deleteTabInVerticalArea(
  tabVerticalArea: TabVeticalArea,
  targetTabIdx: number,
  notChangeCurrentTabIdx: boolean = false
): TabVeticalArea | null {

  const tabList = tabVerticalArea.tabList;
  const deletedTabList: Tab[] = tabList.filter((tab, idx) => targetTabIdx !== idx);
  
  if(!deletedTabList[0]) {
    return null;
  }

  const length = deletedTabList.length - 1;

  let currentTabIndex = length < targetTabIdx? length : targetTabIdx;

  if(notChangeCurrentTabIdx) {
    currentTabIndex = tabVerticalArea.currentTabIndex;
  }

  return updateObject(tabVerticalArea, { 
    tabList: deletedTabList,
    currentTabIndex
  });
}

function deleteTabInHorizonArea(
  tabHorizonArea: TabHorizonArea,
  targetTabVerticalAreaIdx: number,
  targetTabIdx: number,
  notChangeCurrentTabIdx: boolean = false
): TabHorizonArea | null {

  const tabVerticalAreaList = tabHorizonArea.verticalAreaList;
  const deletedTabInVerticalAreaList: TabVeticalArea[] = [];
  const verticalAreaLength = tabVerticalAreaList.length;

  let areaPosition: number | null = null; 

  for(let verticalIdx = 0; verticalIdx < verticalAreaLength; verticalIdx++) {
    
    const tabVertialArea = tabVerticalAreaList[verticalIdx];

    if(verticalIdx !== targetTabVerticalAreaIdx) {

      if(areaPosition === null) {
        deletedTabInVerticalAreaList.push(tabVertialArea);
      } else {

        const newTabVerticalArea = updateObject(tabVertialArea, { areaPosition });

        areaPosition = null;

        deletedTabInVerticalAreaList.push(newTabVerticalArea);
      }

    } else {

      const deletedTabInVerticalArea = deleteTabInVerticalArea(
                                          tabVertialArea,
                                          targetTabIdx,
                                          notChangeCurrentTabIdx
                                        );
                                       
      if(!deletedTabInVerticalArea) {
        areaPosition = tabVertialArea.areaPosition;
      } else {
        deletedTabInVerticalAreaList.push(deletedTabInVerticalArea);
      }

    }

  }

  if(!deletedTabInVerticalAreaList[0]) {
    return null;
  } 

  return updateObject(tabHorizonArea, { 
    verticalAreaList: deletedTabInVerticalAreaList
  });
}

export function deleteTabInList(
  tabHorizonAreaList: TabHorizonArea[],
  targetTabLocation: TabLocation,
  notChangeCurrentTabIdx: boolean = false
): TabHorizonArea[] {

  if(!checkIfTabExists(tabHorizonAreaList, targetTabLocation)) return tabHorizonAreaList;

  const targetTabHorizonAreaIdx  = targetTabLocation[0];
  const targetTabVerticalAreaIdx = targetTabLocation[1];
  const targetTabIdx             = targetTabLocation[2];
  const deletedTabInHorizonAreaList: TabHorizonArea[] = [];
  const tabHorizonAreaListLength =  tabHorizonAreaList.length;

  let areaPosition: number | null = null; 

  for(let horizonIdx = 0; horizonIdx < tabHorizonAreaListLength; horizonIdx++) {

    const tabHorizonArea = tabHorizonAreaList[horizonIdx];

    if(horizonIdx !== targetTabHorizonAreaIdx) {

      if(areaPosition === null) {
        deletedTabInHorizonAreaList.push(tabHorizonArea);
      } else {
        const newTabHorizonArea = updateObject(tabHorizonArea, { areaPosition });

        areaPosition = null;

        deletedTabInHorizonAreaList.push(newTabHorizonArea);
      }
      
    } else {

      const deletedTabHorizonArea = deleteTabInHorizonArea(
                                      tabHorizonArea, 
                                      targetTabVerticalAreaIdx, 
                                      targetTabIdx,
                                      notChangeCurrentTabIdx
                                    );
    
      if(!deletedTabHorizonArea) {
        areaPosition = tabHorizonArea.areaPosition;
      } else {
        deletedTabInHorizonAreaList.push(deletedTabHorizonArea);
      } 

    }

  }

  return deletedTabInHorizonAreaList;
}


export function deleteTabListInList(
  tabHorizonAreaList: TabHorizonArea[],
  typeList: string[],
  targetTabLoction?: TabLocation | [ number, number ], 
): TabHorizonArea[] {

  if(targetTabLoction) {

    const {
      targetTabHorizonAreaIdx,
      targetTabVerticalAreaIdx
    } = getTargetLocation(targetTabLoction);

    if(targetTabVerticalAreaIdx === undefined) {
      return tabHorizonAreaList;
    }

    return tabHorizonAreaList.map((tabHorizonArea, idx) => {

      if(targetTabHorizonAreaIdx !== idx) {
        return tabHorizonArea;
      }

      const verticalAreaList = tabHorizonArea.verticalAreaList.map((tabVerticalArea, idx) => {

        if(targetTabVerticalAreaIdx !== idx) {
          return tabVerticalArea;
        }

        const tabList = tabVerticalArea.tabList.filter(({ type }) => !typeList.includes(type));

        return updateObject(tabVerticalArea, { 
          tabList, 
          currentTabIndex: 0 
        });
      })

      return updateObject(tabHorizonArea, { verticalAreaList });
    });

  } else {

    return tabHorizonAreaList.map((tabHorizonArea, idx) => {

      const verticalAreaList = tabHorizonArea.verticalAreaList.map((tabVerticalArea, idx) => {

        const tabList = tabVerticalArea.tabList.filter(({ type }) => !typeList.includes(type));

        return updateObject(tabVerticalArea, { 
          tabList, 
          currentTabIndex: 0 
        });
      })

      return updateObject(tabHorizonArea, { verticalAreaList });
    });

  }
}