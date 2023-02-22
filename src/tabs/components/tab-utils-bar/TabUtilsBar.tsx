import React, { ReactElement, useCallback, useMemo } from "react";
import { TabElementProps } from "../..";
import { TabLocation } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabUtilsBarView from "./TabUtilsBarView";

interface TabUtilsBarProps extends TabsBaseProps {
  horizonAreaIndex: number;
  verticalAreaIndex: number;
  tabIndex: number;
  rightUtilsElement?: (props: TabElementProps) => ReactElement;
  leftUtilsElement?: (props: TabElementProps) => ReactElement;
} 

const TabUtilsBar: React.FC<TabUtilsBarProps> = ({
  useTabsStoreHooks,
  horizonAreaIndex,
  verticalAreaIndex,
  tabIndex,
  rightUtilsElement,
  leftUtilsElement
}) => {

  const {
    state: {
      currentTabLocation,
      targetTabLocation,
      hoveringType,
      isActiveDefaultUtilMenu
    },
    onSetTabLocation
  } = useTabsStoreHooks;

  const tabLocation: TabLocation = useMemo(() => 
    [horizonAreaIndex, verticalAreaIndex, tabIndex]
  , [horizonAreaIndex, verticalAreaIndex, tabIndex]);

  const selected = useMemo(() => {
    
    if(!targetTabLocation || hoveringType !== "MOVE_TAB") {
      return false;
    }
    
    return tabLocation.join(",") === targetTabLocation.join(",");
  }, [tabLocation, targetTabLocation, hoveringType]);

  const changeTargetTabLocation = useCallback(() => {
    onSetTabLocation(tabLocation);
  }, [onSetTabLocation, tabLocation]);

  const resetTargetTabLocation = useCallback(() => {
   onSetTabLocation(null);
  }, [onSetTabLocation]);
  
  const props = {
    useTabsStoreHooks,
    tabLocation,
    selected,
    isSelectActive: currentTabLocation !== null,
    isActiveDefaultUtilMenu,
    rightUtilsElement,
    leftUtilsElement,
    changeTargetTabLocation,
    resetTargetTabLocation
  }
  
  return <TabUtilsBarView {...props} />;
}

export default TabUtilsBar;