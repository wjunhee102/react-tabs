import { 
  Tab, 
  TabProperties,
  TabLocation, 
  TabsContentRect,
  TabVeticalArea,
  TabHorizonArea,
  ChangeCurrentTabIndexInAreaListByTargetTabOptions
} from "./types";
import { addTabInList } from "./utils/addTabInList";
import { deleteTabInList, deleteTabListInList } from "./utils/deleteTabInList";
import { getRemovedTabLocation, getTargetLocation } from "./utils/getLocation";
import { getTabInList } from "./utils/getTab";
import { initAreaPositionInList, initAreaPositionInListFix } from "./utils/init";
import { 
  resizeAreaPositionInList, 
  updateAreaPositionInAreaList, 
  updateCurrentTabIndexInAreaList 
} from "./utils/update";
import { 
  createHorizonArea, 
  createNewHorizonArea, 
  createNewVerticalArea, 
  createTab, 
  createVerticalArea 
} from "./utils/create";
import { checkIfTabExists } from "./utils/check";
import { moveTabInList } from "./utils/moveTabInList";
import { findTabLocationInList } from "./utils/findTabLocationInList";
import { TabElementTable } from "../..";
import { validateTabHorizonAreaList } from "./utils/validationTab";

export class TabArray extends Array<TabHorizonArea> {

  static createTab(type: string, props?: TabProperties): Tab {
    return createTab(type, props);
  }

  static createVerticalArea(
    tabList: Tab[], 
    areaPosition: number = 0,
    currentTabIndex: number = 0
  ) {
    return createVerticalArea(tabList, areaPosition, currentTabIndex);
  }

  static createHorizonArea(
    verticalAreaList: TabVeticalArea[], 
    areaPosition: number = 0,
  ) {
    return createHorizonArea(verticalAreaList, areaPosition);
  }

  static createHorizonAreaList(
    initTabList: Tab[][][]
  ) {
    return initTabList.map(firstDepth => {

      const verticalAreaList = firstDepth.map(secondDepth => 
        createVerticalArea(secondDepth)
      );

      return createHorizonArea(verticalAreaList);
    });
  }

  static createNewVerticalArea(
    targetTab: Tab | Tab[]
  ) {
    return createNewVerticalArea(targetTab);
  }

  static createNewHorizonArea(
    targetTab: Tab | Tab[]
  ) {
    return createNewHorizonArea(targetTab);
  }
  
  public checkIfTabExists(targetTabLocation: TabLocation): Tab | null {
    return checkIfTabExists(this, targetTabLocation);
  }
  
  public copy() {
    return new TabArray(...this);
  }

  public initHorizonAreaList(initTabList: Tab[][][]) {
    if(
      !Array.isArray(initTabList) 
      || (initTabList.length < 1 && !initTabList[0][0][0])
    ) {
      return this;
    }

    const horizonAreaList = initTabList.map(firstDepth => {
      const verticalAreaList = firstDepth.map(secondDepth => 
        createVerticalArea(secondDepth)
      );

      return createHorizonArea(verticalAreaList);
    })

    return new TabArray(...this, ...horizonAreaList);
  }

  public initAreaPositionInList(
    tabsContentRect: TabsContentRect
  ) {
    return new TabArray(...initAreaPositionInList(this, tabsContentRect));
  }

  public initAreaPositionInListFix(
    tabsContentRect: TabsContentRect
  ) {
    return new TabArray(...initAreaPositionInListFix(this, tabsContentRect));
  }

  public addTabInList(
    targetTabLocation: [number] | [number, number] | TabLocation,
    targetTab: Tab[] | Tab,
    tabsContentRect: TabsContentRect
  ) {
    return new TabArray(...addTabInList(this, targetTabLocation, targetTab, tabsContentRect));
  }

  public deleteTabInList(targetTabLocation: TabLocation) {
    return new TabArray(...deleteTabInList(this, targetTabLocation));
  }

  public deleteTabListInList( 
    typeList: string[],
    targetTabLoction?: TabLocation | [ number, number ]
  ) {
    return new TabArray(...deleteTabListInList(this, typeList, targetTabLoction));
  }

  public moveTabInList(
    currentTabLocation: TabLocation,
    targetTabLocation: [number] | [number, number] | TabLocation,
    tabsContentRect: TabsContentRect
  ) {

    const currentTab = getTabInList(this, currentTabLocation);

    if(!currentTab) {
      return this;
    }

    let locatedBehindTarget = false;

    const {
      targetTabHorizonAreaIdx,
      targetTabVerticalAreaIdx,
      targetTabIdx
    } = getTargetLocation(targetTabLocation);

    if(
      currentTabLocation[0] === targetTabHorizonAreaIdx
      && currentTabLocation[1] === targetTabVerticalAreaIdx
    ) {
      
      if(targetTabIdx === undefined) {
        return new TabArray(...addTabInList(this, targetTabLocation, currentTab, tabsContentRect, locatedBehindTarget));
      }

      return new TabArray(...moveTabInList(this, currentTabLocation, targetTabLocation as TabLocation));
    }

    const removedTabLocation = getRemovedTabLocation(currentTabLocation, targetTabLocation);

    const addedTabInList = addTabInList(this, targetTabLocation, currentTab, tabsContentRect, locatedBehindTarget);

    return new TabArray(...deleteTabInList(addedTabInList, removedTabLocation, true));
  }

  public updateAreaPositionInList(
    targetTabLocation: [number] | [number, number],
    targetAreaPosition: number,
    tabsContentRect: TabsContentRect
  ) {
    return new TabArray(...updateAreaPositionInAreaList(this, targetTabLocation, targetAreaPosition, tabsContentRect));
  }

  public resizeAreaPositionInList(
    preTabsContentRect: TabsContentRect,
    targetTabsContentRect: TabsContentRect
  ) {
    return new TabArray(...resizeAreaPositionInList(this, preTabsContentRect, targetTabsContentRect));
  }

  public updateCurrentTabIndexInAreaList(
    targetTabLocation: TabLocation
  ) {
    return new TabArray(...updateCurrentTabIndexInAreaList(this, targetTabLocation));
  }

  public findTabLocationInList(
    tabType: string,
    options: ChangeCurrentTabIndexInAreaListByTargetTabOptions = {}
  ) {
    return findTabLocationInList({
              tabType,
              tabHorizonAreaList: this,
              ...options
            });
  }

  public validateTabArray(tabElementTable: TabElementTable) {
    return new TabArray(...validateTabHorizonAreaList(this, tabElementTable));
  }
}