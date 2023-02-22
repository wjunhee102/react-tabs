import { TabArray } from "../tabArray";
import { 
  Tab, 
  TabLocation, 
  TabVeticalArea 
} from "../types";
import { getTargetTabLocation } from "./getLocation";

type ResultByFindTabLocationInList<T> = 
{
  findedTabLocation: T;
  matched: boolean;
} | null;

interface FindTabLocationInTabListProps {
  tabType: string;
  targetTabIndex: number;
  createATab: boolean;
  tabList: Tab[];
}

function findTabLocationInTabList(
  {
    tabType,
    tabList,
    createATab
  }: FindTabLocationInTabListProps
): ResultByFindTabLocationInList<number> {

  if(!tabList[0]) {
    return {
      findedTabLocation: 0,
      matched: false
    }
  }

  const findedTabIndex = tabList.findIndex(({ type }) => type === tabType);

  if(findedTabIndex < 0) {
    return createATab? 
      { 
        findedTabLocation: tabList.length, 
        matched: false 
      } 
      : null;
  } 

  return {
    findedTabLocation: findedTabIndex,
    matched: true
  };
}

interface FindTabLocationInTabVerticalAreaListProps {
  tabType: string;
  tabVerticalAreaList: TabVeticalArea[];
  targetTabLocation: [ number, number ];
  createATab: boolean;
}

function findTabLocationInTabVerticalAreaList(
  {
    tabType,
    tabVerticalAreaList,
    targetTabLocation,
    createATab
  }: FindTabLocationInTabVerticalAreaListProps
): ResultByFindTabLocationInList<[ number, number ]> {

  if(!tabVerticalAreaList[0]) {
    return null;
  }
  
  const tabVerticalArea = tabVerticalAreaList[targetTabLocation[0]];

  if(!tabVerticalArea) {
    return null;
  }

  const result = findTabLocationInTabList(
    { 
      tabType,
      targetTabIndex: targetTabLocation[1],
      createATab,
      tabList: tabVerticalArea.tabList
    }
  );

  if(!result) {
    return null;
  }

  const {
    findedTabLocation,
    matched
  } = result;

  return {
    findedTabLocation: [ targetTabLocation[0], findedTabLocation ],
    matched
  }
}

interface FindTabLocationInTabHosizionAreaListProps {
  tabType: string;
  tabHorizonAreaList: TabArray;
  targetTabLocation: TabLocation;
  createATab: boolean;
}

function findTabLocationInTabHosizionAreaList(
  {
    tabType,
    tabHorizonAreaList,
    targetTabLocation,
    createATab
  }: FindTabLocationInTabHosizionAreaListProps
): ResultByFindTabLocationInList<TabLocation> {

  const {
    targetTabHorizonAreaIdx,
    targetTabVerticalAreaIdx,
    targetTabIdx
  } = getTargetTabLocation(targetTabLocation);

  const tabHorizonArea = tabHorizonAreaList[targetTabHorizonAreaIdx];

  if(!tabHorizonArea) {
    return null;
  }

  const result = findTabLocationInTabVerticalAreaList(
    {
      tabType,
      tabVerticalAreaList: tabHorizonArea.verticalAreaList,
      targetTabLocation: [ targetTabVerticalAreaIdx, targetTabIdx ],
      createATab
    }
  );

  if(!result) {
    return null;
  }

  const {
    findedTabLocation,
    matched
  } = result;

  return {
    findedTabLocation: [ targetTabHorizonAreaIdx, ...findedTabLocation ],
    matched
  }
}

interface FindTabLocationInListAllProps {
  tabType: string,
  tabHorizonAreaList: TabArray
}

function findTabLocationInListAll(
  {
    tabType,
    tabHorizonAreaList
  }: FindTabLocationInListAllProps
): ResultByFindTabLocationInList<TabLocation> {

  const tabHorizonAreaListLength = tabHorizonAreaList.length;

  let tabHorizonAreaIndex: number = 0;

  for(; tabHorizonAreaIndex < tabHorizonAreaListLength; tabHorizonAreaIndex++) {

    const tabVerticalAreaList = tabHorizonAreaList[tabHorizonAreaIndex].verticalAreaList;

    if(tabVerticalAreaList[0]) {

      const tabVerticalAreaListLength = tabVerticalAreaList.length;

      let tabVerticalAreaIndex: number = 0;

      for(; tabVerticalAreaIndex < tabVerticalAreaListLength; tabVerticalAreaIndex++) {

        const tabList = tabVerticalAreaList[tabVerticalAreaIndex].tabList;

        if(tabList[0]) {

          const tabListLength = tabList.length;

          let tabIndex: number = 0;

          for(; tabIndex < tabListLength; tabIndex++) {
            
            const tab = tabList[tabIndex];

            if(tab.type === tabType) {
              return {
                findedTabLocation: [ tabHorizonAreaIndex, tabVerticalAreaIndex, tabIndex ],
                matched: true 
              }
            }

          }

        }

      }

    }

  }

  return null;
}

interface FindTabLocationInListHandlerProps {
  tabType: string;
  tabHorizonAreaList: TabArray;
  currentTabLocation: TabLocation;
  createATab: boolean;
}

function findTabLocationInListByCurrentHandler(
  {
    tabType,
    tabHorizonAreaList,
    currentTabLocation,
    createATab
  }: FindTabLocationInListHandlerProps
) {
  return findTabLocationInTabHosizionAreaList(
    {
      tabType,
      tabHorizonAreaList,
      targetTabLocation: currentTabLocation,
      createATab
    }
  );
}

function findTabLocationInListByLeftHandler(
  {
    tabType,
    tabHorizonAreaList,
    currentTabLocation,
    createATab
  }: FindTabLocationInListHandlerProps
) {

  const targetTabHorizonAreaIdx = currentTabLocation[0];

  const tabHorizonAreaIndex = targetTabHorizonAreaIdx?
                                targetTabHorizonAreaIdx - 1 
                                : targetTabHorizonAreaIdx + 1
                                ;

  return findTabLocationInTabHosizionAreaList(
    {
      tabType,
      tabHorizonAreaList,
      targetTabLocation: [ tabHorizonAreaIndex, 0, -1 ],
      createATab
    }
  );
}

function findTabLocationInListByRightHandler(
  {
    tabType,
    tabHorizonAreaList,
    currentTabLocation,
    createATab
  }: FindTabLocationInListHandlerProps
) {

  const targetTabHorizonAreaIdx = currentTabLocation[0];

  const tabHorizonAreaIndex = targetTabHorizonAreaIdx < tabHorizonAreaList.length - 1? 
                              targetTabHorizonAreaIdx + 1 
                              : targetTabHorizonAreaIdx - 1
                            ;

  return findTabLocationInTabHosizionAreaList(
    {
      tabType,
      tabHorizonAreaList,
      targetTabLocation: [ tabHorizonAreaIndex, 0, -1 ],
      createATab
    }
  );
}

function findTabLocationInListByUpHandler(
  {
    tabType,
    tabHorizonAreaList,
    currentTabLocation,
    createATab
  }: FindTabLocationInListHandlerProps
) {

  const {
    targetTabHorizonAreaIdx,
    targetTabVerticalAreaIdx
  } = getTargetTabLocation(currentTabLocation);

  const tabVerticalAreaIndex = targetTabVerticalAreaIdx?
                                targetTabVerticalAreaIdx - 1
                                : targetTabVerticalAreaIdx + 1

  return findTabLocationInTabHosizionAreaList(
    {
      tabType,
      tabHorizonAreaList,
      targetTabLocation: [ targetTabHorizonAreaIdx, tabVerticalAreaIndex, -1 ],
      createATab
    }
  );
}

function findTabLocationInListByDownHandler(
  {
    tabType,
    tabHorizonAreaList,
    currentTabLocation,
    createATab
  }: FindTabLocationInListHandlerProps
) {

  const {
    targetTabHorizonAreaIdx,
    targetTabVerticalAreaIdx
  } = getTargetTabLocation(currentTabLocation);

  const tabHorizonArea = tabHorizonAreaList[targetTabHorizonAreaIdx];

  if(!tabHorizonArea) {
    return null;
  }

  const tabVerticalAreaList = tabHorizonArea.verticalAreaList;

  const tabVerticalAreaIndex = targetTabVerticalAreaIdx < tabVerticalAreaList.length - 1?
                                targetTabVerticalAreaIdx + 1
                                : targetTabVerticalAreaIdx - 1;

  return findTabLocationInTabHosizionAreaList(
    {
      tabType,
      tabHorizonAreaList,
      targetTabLocation: [ targetTabHorizonAreaIdx, tabVerticalAreaIndex, -1 ],
      createATab
    }
  );
}


const LEFT    = "LEFT" as const;
const RIGHT   = "RIGHT" as const;
const UP      = "UP" as const;
const DOWN    = "DOWN" as const;
const CURRENT = "CURRENT" as const;

const findTabLocationInListTable = {
  [CURRENT]: findTabLocationInListByCurrentHandler,
  [LEFT]   : findTabLocationInListByLeftHandler,
  [RIGHT]  : findTabLocationInListByRightHandler,
  [UP]     : findTabLocationInListByUpHandler,
  [DOWN]   : findTabLocationInListByDownHandler
}

export type WhereToLookTypes = keyof typeof findTabLocationInListTable;

interface FindTabLocationInListProps {
  tabType: string;
  tabHorizonAreaList: TabArray;
  currentTabLocation?: TabLocation;
  createATab?: boolean;
  findATab?: boolean;
  whereToLook?: WhereToLookTypes;
}

export function findTabLocationInList(
  {
    tabType,
    tabHorizonAreaList,
    currentTabLocation = [ 0, 0, 0 ],
    createATab = false,
    findATab = false,
    whereToLook = CURRENT
  }: FindTabLocationInListProps
): ResultByFindTabLocationInList<TabLocation> {

  if(!tabHorizonAreaList[0]) {
    return null;
  }

  let result: ResultByFindTabLocationInList<TabLocation> = null;

  if(findTabLocationInListTable.hasOwnProperty(whereToLook)) {
    result = findTabLocationInListTable[whereToLook](
              {
                tabType,
                tabHorizonAreaList,
                currentTabLocation,
                createATab
              }
            );
  }

  if(
    result
    && result.matched
  ) {
    return result;
  }

  if(findATab) {

    const findATabResult = findTabLocationInListAll({ tabType, tabHorizonAreaList });

    if(findATabResult) {
      return findATabResult;
    }

  }

  return result;
}