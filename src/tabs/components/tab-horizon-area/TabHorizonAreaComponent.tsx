import React, { useCallback, useMemo } from "react";
import { TabLocation, TabVeticalArea } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabHorizonAreaComponentView from "./TabHorizonAreaComponentView";

interface TabHorizonAreaComponentProps extends TabsBaseProps {
  getWidth: ( horizonIdx: number ) => number;
  horizonAreaIndex: number;
  areaPosition: number;
  verticalAreaList: TabVeticalArea[];
}

const TabHorizonAreaComponent: React.FC<TabHorizonAreaComponentProps> = ({
  useTabsStoreHooks,
  getWidth,
  horizonAreaIndex,
  areaPosition,
  verticalAreaList
}) => {

  const {
    state: {
      tabsContentRect: {
        height
      },
      targetTabLocation,
      hoveringType,
      currentTabLocation
    },
    onSetTabLocation
  } = useTabsStoreHooks;
 
  const horizonAreaStyle = useMemo(() => 
    ({ width: `${getWidth(horizonAreaIndex)}px` })
  , [getWidth, horizonAreaIndex]);

  const tabLocation: TabLocation = useMemo(() => 
    [horizonAreaIndex, verticalAreaList.length, 0]
  , [horizonAreaIndex, verticalAreaList]);

  const selected = useMemo(() => {
    
    if(!targetTabLocation) {
      return false;
    }
    
    return tabLocation.join(",") === targetTabLocation.join(",");
  }, [tabLocation, targetTabLocation]);

  const selectionAreaStyle = useMemo(() => ({
    ...horizonAreaStyle,
    left: `${areaPosition}px`,
    bottom: 0,
    height: "30%"
  }), [horizonAreaStyle, areaPosition]);

  const isSelectActive = useMemo(() => {
    
    if(
      hoveringType === "ADD_TAB"
      || !currentTabLocation
    ) {
      return false;
    }

    return true;
  }, [currentTabLocation, hoveringType]);

  const getHeight = useCallback((verticalIdx: number) => {

    const nextArea = verticalAreaList[verticalIdx + 1];
    const nextAreaPosition = nextArea? nextArea.areaPosition : height;

    return nextAreaPosition - verticalAreaList[verticalIdx].areaPosition;
  }, [height, verticalAreaList]);

  const changeTargetTabLocation = useCallback(() => {
    onSetTabLocation(tabLocation);
  }, [onSetTabLocation, tabLocation]);

  const resetTargetTabLocation = useCallback(() => {
    onSetTabLocation(null);
  }, [onSetTabLocation]);

  const props ={
    useTabsStoreHooks,
    horizonAreaStyle,
    verticalAreaList,
    horizonAreaIndex,
    areaPosition,
    selected,
    selectionAreaStyle,
    isSelectActive,
    getHeight,
    changeTargetTabLocation,
    resetTargetTabLocation
  }

  return <TabHorizonAreaComponentView {...props} />;
}

export default TabHorizonAreaComponent;