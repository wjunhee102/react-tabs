import React, { useCallback, useMemo, useState } from "react";
import { useTooltip } from "../../hooks/useTooltip";
import { MOVE_TAB, SELECT_AREA, TOOLTIP_ACTION_TYPE_BY_TAB } from "../../store/constants";
import { Tab, TabLocation } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabButtonView from "./TabButtonView";

interface TabButtonProps extends TabsBaseProps {
  isActive: boolean;
  horizonAreaIndex: number;
  verticalAreaIndex: number;
  tabIndex: number;
  tab: Tab;
}

const TabButton: React.FC<TabButtonProps> = ({
  useTabsStoreHooks,
  isActive,
  horizonAreaIndex,
  verticalAreaIndex,
  tabIndex,
  tab
}) => {

  const [ isDrag, setDrag ] = useState<boolean>(false);

  const {
    state: {
      currentTabLocation,
      targetTabLocation,
      hoveringType,
      tabElementTable,
      isActiveDeleteTabButton
    },
    onSetMoveTab,
    onSetTabLocation,
    onDeleteTab,
    onChangeCurrentTab,
    onOpenHoveringMenu
  } = useTabsStoreHooks;

  const { title, style } = useMemo(() => {

    const tabElement = tabElementTable[tab.type];

    let title = tab.title;
    let style = tab.style;

    if(!title) {
      title = tabElement.title? tabElement.title : "tab";
    }

    if(!style) {
      style = tabElement.style;
    }

    return { title, style }
  }, [tabElementTable, tab]);

  const tabLocation: TabLocation = useMemo(() => 
    [horizonAreaIndex, verticalAreaIndex, tabIndex]
  , [horizonAreaIndex, verticalAreaIndex, tabIndex]);

  const selected = useMemo(() => {
    
    if(!targetTabLocation || hoveringType !== MOVE_TAB) {
      return false
    }

    return tabLocation.join(",") === targetTabLocation.join(",");
  }, [tabLocation, targetTabLocation, hoveringType]);

  const {
    openTooltip,
    closeTooltip
  } = useTooltip(useTabsStoreHooks, TOOLTIP_ACTION_TYPE_BY_TAB, tab.type);

  const changeCurrentTabIndex = useCallback((e: React.MouseEvent) => {
    onChangeCurrentTab(tabLocation);
    setDrag(false);
  }, [tabLocation, onChangeCurrentTab]);

  const activeDrag = useCallback(() => {
    setDrag(true);
  }, []);

  const disableDrag = useCallback(() => {
    setDrag(false);
  }, []);

  const startMoveTab = useCallback((e: React.MouseEvent) => {
    if(
      isDrag 
      && hoveringType !== MOVE_TAB
    ) {
      onSetMoveTab(tabLocation, {
        clientX: e.clientX,
        clientY: e.clientY
      });

      setDrag(false);
    }
  }, [onSetMoveTab, isDrag, tabLocation, hoveringType]);

  const deleteTab = useCallback(() => {
    onDeleteTab(tabLocation);
  }, [onDeleteTab, tabLocation]);

  const changeTargetTabLocation = useCallback(() => {
    onSetTabLocation(tabLocation);
  }, [onSetTabLocation, tabLocation]);

  const resetTargetTabLocation = useCallback(() => {
   onSetTabLocation(null);
  }, [onSetTabLocation]);

  const openAreaSelectMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    onOpenHoveringMenu(SELECT_AREA,{
      clientX: e.clientX,
      clientY: e.clientY
    });

    onChangeCurrentTab(tabLocation);

  }, [onOpenHoveringMenu, onChangeCurrentTab, tabLocation]);

  if(!tabElementTable || !tabElementTable[tab.type]) {
    onDeleteTab(tabLocation);
    
    return null;
  }

  const props = {
    isActive,
    title,
    style,
    selected,
    isSelectActive: currentTabLocation !== null,
    isActiveDeleteTabButton,
    changeCurrentTabIndex,
    activeDrag,
    disableDrag,
    startMoveTab,
    deleteTab,
    changeTargetTabLocation,
    resetTargetTabLocation,
    openAreaSelectMenu,
    openTooltip,
    closeTooltip
  }
  
  return <TabButtonView {...props} />;
}

export default TabButton;