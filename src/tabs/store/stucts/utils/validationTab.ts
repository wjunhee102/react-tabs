import { TabElementTable } from "../../..";
import { updateObject } from "../../../utils/objectUtils";
import { Tab, TabHorizonArea, TabVeticalArea } from "../types";


export function validationTabList(
  tabList: Tab[],
  tabElementTable: TabElementTable
): Tab[] {
  return tabList.filter(tab => tabElementTable.hasOwnProperty(tab.type));
}

export function validationTabListBy2d(
  tabListBy2d: Tab[][], 
  tabElementTable: TabElementTable
): Tab[][] {

  if(!tabListBy2d[0]) {
    return [];
  }

  const newTabListBy2d: Tab[][] = [];

  tabListBy2d.forEach(tabList => {

    const newTabList = validationTabList(tabList, tabElementTable);

    if(newTabList[0]) {
      newTabListBy2d.push(newTabList);
    }

  });

  return newTabListBy2d;
}

export function validationTabListBy3d(
  tabListBy3d: Tab[][][], 
  tabElementTable: TabElementTable
): Tab[][][] {

  if(!tabListBy3d[0]) {
    return [];
  }

  const newTabListBy3d: Tab[][][] = [];

  tabListBy3d.forEach(tabListBy2d => {

    const newTabListBy2d = validationTabListBy2d(tabListBy2d, tabElementTable);

    if(newTabListBy2d[0]) {
      newTabListBy3d.push(newTabListBy2d);
    }

  });

  return newTabListBy3d;
}

export function validateVerticalAreaList(
  tabVeticalAreaList: TabVeticalArea[], 
  tabElementTable: TabElementTable
): TabVeticalArea[] {

  if(!tabVeticalAreaList[0]) {
    return [];
  }

  const newTabVeticalAreaList: TabVeticalArea[] = [];

  tabVeticalAreaList.forEach(tabVeticalArea => {

    if(!tabVeticalArea.tabList[0]) {
      return;
    }

    const newTabList = validationTabList(tabVeticalArea.tabList, tabElementTable);

    if(newTabList[0]) {
      newTabVeticalAreaList.push(
        updateObject(tabVeticalArea, 
          { 
            tabList: newTabList,
            currentTabIndex: 0
          }
        )
      );
    }

  });

  return newTabVeticalAreaList;
}

export function validateTabHorizonAreaList(
  tabHorizonAreaList: TabHorizonArea[],
  tabElementTable: TabElementTable
) {

  if(!tabHorizonAreaList[0]) {
    return [];
  }

  const newTabHorizonAreaList: TabHorizonArea[] = []; 

  tabHorizonAreaList.forEach(tabHorizonArea => {
    
    if(!tabHorizonArea.verticalAreaList[0]) {
      return;
    }

    const newTabVeticalAreaList = validateVerticalAreaList(tabHorizonArea.verticalAreaList, tabElementTable);

    if(newTabVeticalAreaList[0]) {
      newTabHorizonAreaList.push(updateObject(tabHorizonArea, { verticalAreaList: newTabVeticalAreaList }));
    }

  });

  return newTabHorizonAreaList;
}