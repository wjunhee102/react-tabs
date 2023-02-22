import { updateObject } from "../../../utils/objectUtils";
import { Tab, TabHorizonArea, TabLocation, TabsContentRect, TabVeticalArea } from "../types";
import { createInsertedAreaPositionInHorizonArea, createInsertedAreaPositionInVerticalArea, createNewHorizonArea, createNewVerticalArea } from "./create";
import { getTargetLocation } from "./getLocation";
import { insertAreaInList } from "./insertAreaInList";
import { removeDuplicatesTabList } from "./removeDuplicatesTabList";

function addTabInVerticalAreaList(
  targetTabVerticalAreaIdx: number, 
  targetTabIdx: number,
  targetTab: Tab[] | Tab,
  locatedBehindTarget: boolean
) {
  return (verticalArea: TabVeticalArea, verticalIdx: number) => {

    if(verticalIdx !== targetTabVerticalAreaIdx) {
      return verticalArea;
    }

    const tabList       = verticalArea.tabList;
    const targetTabList = Array.isArray(targetTab)? targetTab : [targetTab];
    const [ filteredTargetTabList, tabIndex ] = removeDuplicatesTabList(tabList, targetTabList);

    if(!filteredTargetTabList[0]) {
      return updateObject(verticalArea, {
        currentTabIndex: tabIndex === -1? 0 : tabIndex
      });
    }

    const targetTabListLength = filteredTargetTabList.length;

    let currentTabIndex: number = verticalArea.currentTabIndex;
    let newTabList: Tab[]       = [];

    if(!tabList[targetTabIdx]) {

      newTabList = [...tabList, ...filteredTargetTabList];

      currentTabIndex = tabIndex !== -1? tabIndex : newTabList.length - targetTabListLength;

    } else {
      
      newTabList = insertAreaInList(tabList, filteredTargetTabList, targetTabIdx, locatedBehindTarget);

      currentTabIndex = tabIndex !== -1? tabIndex : targetTabIdx;

    }

    return updateObject(verticalArea, {
      tabList: newTabList,
      currentTabIndex
    });
  }
}

function addTabInHorisionAreaList(
  targetTabHorizonAreaIdx: number,
  targetTabVerticalAreaIdx: number,
  targetTabIdx: number | undefined,
  targetTab: Tab | Tab[],
  tabsContentRect: TabsContentRect,
  locatedBehindTarget: boolean
) {
  return (horizonArea: TabHorizonArea, horizonIdx: number) => {
    
    if(horizonIdx !== targetTabHorizonAreaIdx) {
      return horizonArea;
    }

    if(!horizonArea.verticalAreaList[targetTabVerticalAreaIdx]) {

      if(horizonIdx !== targetTabHorizonAreaIdx) {
        return horizonArea;
      }

      const lastVerticalAreaIdx = horizonArea.verticalAreaList.length - 1;
      
      if(lastVerticalAreaIdx < 0) {

        return updateObject(horizonArea, { 
          verticalAreaList: [ createNewVerticalArea(targetTab) ]
        });
      } 

      const newVerticalArea = createInsertedAreaPositionInVerticalArea(
                                horizonArea.verticalAreaList,
                                lastVerticalAreaIdx,
                                targetTab,
                                tabsContentRect.height
                              );

      return updateObject(horizonArea, {
        verticalAreaList: [...horizonArea.verticalAreaList, newVerticalArea]
      });
    }

    if(targetTabIdx === undefined) {

      const verticalAreaList    = horizonArea.verticalAreaList;
      const newTabVerticalArea  = createInsertedAreaPositionInVerticalArea(
                                    verticalAreaList,
                                    targetTabVerticalAreaIdx,
                                    targetTab,
                                    tabsContentRect.height
                                  );
      const newVerticalAreaList = insertAreaInList(verticalAreaList, newTabVerticalArea, targetTabVerticalAreaIdx, locatedBehindTarget);

      return updateObject(horizonArea, { verticalAreaList: newVerticalAreaList });
    } 

    const verticalAreaList = horizonArea
                              .verticalAreaList
                              .map(
                                addTabInVerticalAreaList(
                                  targetTabVerticalAreaIdx, 
                                  targetTabIdx, 
                                  targetTab, 
                                  locatedBehindTarget
                                )
                              );

    return updateObject(horizonArea, { verticalAreaList });
  }
}

export function addTabInList(
  tabHorizonAreaList: TabHorizonArea[],
  targetTabLocation: [number] | [number, number] | TabLocation,
  targetTab: Tab | Tab[],
  tabsContentRect: TabsContentRect,
  locatedBehindTarget: boolean = false
): TabHorizonArea[] {

  if(!tabHorizonAreaList[0]) {
    return [ createNewHorizonArea(targetTab) ];
  }

  const {
    targetTabHorizonAreaIdx,
    targetTabVerticalAreaIdx,
    targetTabIdx
  } = getTargetLocation(targetTabLocation);

  if(!tabHorizonAreaList[targetTabHorizonAreaIdx]) {

    const lastHorizonAreaIdx = tabHorizonAreaList.length - 1;
    const newTabHorizonArea  = createInsertedAreaPositionInHorizonArea(
                                 tabHorizonAreaList,
                                 lastHorizonAreaIdx,
                                 targetTab,
                                 tabsContentRect.width
                               );

    return [...tabHorizonAreaList, newTabHorizonArea];
  }

  if(targetTabVerticalAreaIdx === undefined) {

    const newTabHorizonArea     = createInsertedAreaPositionInHorizonArea(
                                    tabHorizonAreaList,
                                    targetTabHorizonAreaIdx,
                                    targetTab,
                                    tabsContentRect.width
                                  );
    const newTabHorizonAreaList = insertAreaInList(
                                    tabHorizonAreaList, 
                                    newTabHorizonArea, 
                                    targetTabHorizonAreaIdx, 
                                    true
                                  );

    return newTabHorizonAreaList;
  } 

  return tabHorizonAreaList.map(
                              addTabInHorisionAreaList(
                                targetTabHorizonAreaIdx,
                                targetTabVerticalAreaIdx,
                                targetTabIdx,
                                targetTab,
                                tabsContentRect,
                                locatedBehindTarget
                              )
                            );
}