import { updateObject } from "../../../utils/objectUtils";
import { TabHorizonArea, TabsContentRect } from "../types";
import { getBasedAreaPosition, getBasedAreaPositionFix } from "./getAreaPosition";

export function initAreaPositionInList(
  tabHorizonAreaList: TabHorizonArea[],
  tabsContentRect: TabsContentRect
): TabHorizonArea[] {

  const horioznAreaPosition = getBasedAreaPosition(tabHorizonAreaList, tabsContentRect.width);

  return tabHorizonAreaList.map((horizonArea, horizonIdx) => {

    const verticalAreaPosition = getBasedAreaPosition(horizonArea.verticalAreaList, tabsContentRect.height);

    const verticalAreaList = horizonArea.verticalAreaList.map((verticalArea, verticalIdx) => 
      updateObject(verticalArea, { areaPosition: verticalAreaPosition * verticalIdx })
    );

    return updateObject(horizonArea, {
      areaPosition: horioznAreaPosition * horizonIdx,
      verticalAreaList
    })
  });
}

export function initAreaPositionInListFix(
  tabHorizonAreaList: TabHorizonArea[],
  tabsContentRect: TabsContentRect
): TabHorizonArea[] {

  const horioznAreaPosition = getBasedAreaPositionFix(tabHorizonAreaList, tabsContentRect.width);

  return tabHorizonAreaList.map((horizonArea, horizonIdx) => {

    const verticalAreaPosition = getBasedAreaPosition(horizonArea.verticalAreaList, tabsContentRect.height);

    const verticalAreaList = horizonArea.verticalAreaList.map((verticalArea, verticalIdx) => 
      updateObject(verticalArea, { areaPosition: verticalAreaPosition * verticalIdx })
    );

    return updateObject(horizonArea, {
      areaPosition: horioznAreaPosition * horizonIdx,
      verticalAreaList
    })
  });
}