import classNames from "classnames";
import OverlayScrollbars from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React, { useMemo } from "react";
import { Tab, TabLocation } from "../../store/stucts/types";
import { elementHandler } from "../../utils/elementHandler";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";

const overlayScrollOptions: OverlayScrollbars.Options = {
  overflowBehavior: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    autoHide: "scroll"
  }
}

interface TabProps extends TabsBaseProps {
  tabLocation: TabLocation;
  tabList: Tab[];
  currentTabIndex: number;
}

const TabArea: React.FC<TabProps> = ({
  useTabsStoreHooks,
  tabLocation,
  tabList,
  currentTabIndex
}) => {

  const {
    state: {
      tabElementTable
    }
  } = useTabsStoreHooks;

  const currentTabLocation: TabLocation = useMemo(() => 
    [tabLocation[0], tabLocation[1], currentTabIndex]
  , [tabLocation, currentTabIndex]);

  const currentTab = useMemo(() => tabList[currentTabIndex], [tabList, currentTabIndex]);

  if(!currentTab) {
    return null;
  }

  const hidden = tabLocation[2] !== currentTabIndex;

  return (
    <OverlayScrollbarsComponent
      className={classNames("w-full h-full", { hidden })}
      options={overlayScrollOptions}
    >
      {elementHandler(tabElementTable, currentTab, useTabsStoreHooks, currentTabLocation, !hidden)}
    </OverlayScrollbarsComponent>
  );
}

export default TabArea;