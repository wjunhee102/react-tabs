import React, { useCallback, useMemo } from "react";
import { UseTabsStoreType } from "../../hooks/useTabsStore";
import { TabLocation } from "../../store/stucts/types";
import TabHorizonAreaListView from "./TabHorizonAreaListView";

export interface TabsBaseProps {
  useTabsStoreHooks: UseTabsStoreType;
}

interface TabHorizonAreaListProps extends TabsBaseProps {}

const TabHorizonAreaList: React.FC<TabHorizonAreaListProps> = ({
  useTabsStoreHooks
}) => {

  const {
    state: {
      tabHorizonAreaList,
      tabsContentRect: {
        width
      },
      hoveringType,
      currentTabLocation,
      targetTabLocation
    },
    onSetTabLocation
  } = useTabsStoreHooks;

  const tabLocation: TabLocation = useMemo(() => 
    [tabHorizonAreaList.length, 0, 0]
  , [tabHorizonAreaList]);

  const selected = useMemo(() => {
    
    if(!targetTabLocation) {
      return false;
    }
    
    return tabLocation.join(",") === targetTabLocation.join(",");
  }, [tabLocation, targetTabLocation]);

  const selectionAreaStyle = useMemo(() => ({
    width: "20%",
    right: 0,
    top: 0,
    height: "100%",
    paddingTop: "10%",
    paddingBotton: "10%"
  }), []);

  const isSelectActive = useMemo(() => {
    
    if(
      hoveringType === "ADD_TAB"
      || !currentTabLocation
    ) {
      return false;
    }

    return true;
  }, [currentTabLocation, hoveringType]);

  const getWidth = useCallback((horizonIdx: number) => {

    const nextArea = tabHorizonAreaList[horizonIdx + 1];
    const nextAreaPosition = nextArea? nextArea.areaPosition : width; 

    return nextAreaPosition - tabHorizonAreaList[horizonIdx].areaPosition;
  }, [width, tabHorizonAreaList]);

  const changeTargetTabLocation = useCallback(() => {
    onSetTabLocation(tabLocation);
  }, [onSetTabLocation, tabLocation]);

  const resetTargetTabLocation = useCallback(() => {
    onSetTabLocation(null);
  }, [onSetTabLocation]);

  const props = {
    useTabsStoreHooks,
    tabHorizonAreaList,
    selected,
    selectionAreaStyle,
    isSelectActive,
    getWidth,
    changeTargetTabLocation,
    resetTargetTabLocation
  }

  return <TabHorizonAreaListView {...props} />;
}

export default TabHorizonAreaList;