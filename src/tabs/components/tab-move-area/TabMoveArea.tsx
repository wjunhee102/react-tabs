import React, { useMemo } from "react";
import { Tab } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabMoveAreaView from "./TabMoveAreaView";

interface TabMoveAreaProps extends TabsBaseProps {
  currentTab: Tab;
}

const TabMoveArea: React.FC<TabMoveAreaProps> = ({
  useTabsStoreHooks,
  currentTab
}) => {

  const {
    state: {
      adjustmentClientX,
      adjustmentClientY,
      tabElementTable
    }
  } = useTabsStoreHooks;

  const { title, style } = useMemo(() => {

    const currentTabElement = tabElementTable[currentTab.type];

    let title = currentTab.title;
    let style = currentTab.style;

    if(!title) {
      title = currentTabElement.title? currentTabElement.title : "tab";
    }

    if(!style) {
      style = currentTabElement.style;
    }

    return { title, style }
  }, [currentTab, tabElementTable]);

  // tab이 움직이는 중에 게속 바뀌기 때문에 useMemo로 감싸지 않는다.
  const moveTabButtonPosition = {
    transform: `translate(${adjustmentClientX - 30}px, ${adjustmentClientY - 20}px)`
  }

  const props = {
    moveTabButtonPosition,
    title,
    style
  }

  return <TabMoveAreaView {...props} />;
}

export default TabMoveArea;