import React, { useMemo } from "react";
import { MOVE_TAB } from "../../store/constants";
import { getTargetTabLocation } from "../../store/stucts/utils/getLocation";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabMoveArea from "./TabMoveArea";

interface TabMoveAreaContainerProps extends TabsBaseProps {}

const TabMoveAreaContainer: React.FC<TabMoveAreaContainerProps> = ({
  useTabsStoreHooks
}) => {

  const {
    state: {
      currentTabLocation,
      tabHorizonAreaList,
      hoveringType
    }
  } = useTabsStoreHooks;

  const currentTab = useMemo(() => {

    if(!currentTabLocation) {
      return null;
    }

    if(!tabHorizonAreaList.checkIfTabExists(currentTabLocation)) {
      return null;
    }

    const {
      targetTabHorizonAreaIdx,
      targetTabVerticalAreaIdx,
      targetTabIdx
    } = getTargetTabLocation(currentTabLocation);

    return tabHorizonAreaList[targetTabHorizonAreaIdx]
            .verticalAreaList[targetTabVerticalAreaIdx]
            .tabList[targetTabIdx];
  }, [currentTabLocation, tabHorizonAreaList]);

  if(!currentTab || hoveringType !== MOVE_TAB) {
    return null;
  }

  const props = {
    currentTab,
    useTabsStoreHooks
  }

  return <TabMoveArea {...props} />;
}


export default TabMoveAreaContainer;