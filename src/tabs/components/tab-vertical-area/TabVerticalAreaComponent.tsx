import React, { useEffect, useMemo, useRef } from "react";
import { Tab, TabLocation } from "../../store/stucts/types";
import NoneTabArea from "../none-tab-area";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabVerticalAreaComponentView from "./TabVerticalAreaComponentView";

interface TabVerticalAreaComponentProps extends TabsBaseProps {
  getHeight: (verticalIdex: any) => number;
  horizonAreaIndex: number;
  verticalAreaIndex: number;
  areaPosition: number;
  tabList: Tab[];
  currentTabIndex: number;
}

const TabVerticalAreaComponent: React.FC<TabVerticalAreaComponentProps> = ({
  useTabsStoreHooks,
  getHeight,
  horizonAreaIndex,
  verticalAreaIndex,
  currentTabIndex,
  tabList
}) => {

  const { onChangeCurrentTab } = useTabsStoreHooks;

  const verticalAreaRef = useRef<HTMLDivElement>(null);

  const tabLocation: TabLocation = useMemo(() => 
    [horizonAreaIndex, verticalAreaIndex, currentTabIndex]
  ,[horizonAreaIndex, verticalAreaIndex, currentTabIndex]);

  const {
    state: {
      tabElementTable
    }
  } = useTabsStoreHooks;

  const currentTab = useMemo(() => tabList[tabLocation[2]], [tabList, tabLocation]);

  const height = useMemo(() => getHeight(verticalAreaIndex), [getHeight, verticalAreaIndex]);

  const verticalAreaStyle = useMemo(() => 
    ({ height: height? `${height}px` : "100%"})
  , [height]);

  const tabAreaStyle = useMemo(() => {

    if(!verticalAreaRef.current) {
      return { height: "100%" };
    }

    const verticalAreaHeight = verticalAreaRef.current.clientHeight;

    return { height: `${(height? height : verticalAreaHeight) - 48}px` };
  // height가 변경될 때 의미가 있음
  // eslint-disable-next-line
  }, [height, verticalAreaRef]);

  useEffect(() => {
    const tabListLength = tabList.length - 1;

    if(currentTabIndex > tabListLength) {
      onChangeCurrentTab([horizonAreaIndex, verticalAreaIndex, tabListLength]);
    }

  }, [currentTabIndex, tabList, horizonAreaIndex, verticalAreaIndex, onChangeCurrentTab]);

  if(
    !tabElementTable 
    || !tabList[0] 
    || !currentTab
    || !tabElementTable[currentTab.type]
  ) {
    return (
      <NoneTabArea 
        useTabsStoreHooks={useTabsStoreHooks}
        tabLocation={tabLocation} 
        verticalAreaStyle={verticalAreaStyle}
      />
    );
  }

  const props = {
    useTabsStoreHooks,
    verticalAreaStyle,
    tabAreaStyle,
    tabList,
    tabLocation,
    currentTab,
    ref: verticalAreaRef,
    rightUtilsElement: tabElementTable[currentTab.type].rightUtilsElement,
    leftUtilsElement: tabElementTable[currentTab.type].leftUtilsElement
  }

  return <TabVerticalAreaComponentView {...props} />;
}

export default TabVerticalAreaComponent;