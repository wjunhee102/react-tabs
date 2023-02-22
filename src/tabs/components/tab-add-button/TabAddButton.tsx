import React, { ReactElement, useCallback, useMemo } from "react";
import { TabElementProps } from "../..";
import { useTooltip } from "../../hooks/useTooltip";
import { TOOLTIP_ACTION_TYPE_BY_ADD_TAB } from "../../store/constants";
import { Tab, TabLocation } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabAddButtonView from "./TabAddButtonView";

interface TabAddButtonProps extends TabsBaseProps {
  horizonAreaIndex: number;
  verticalAreaIndex: number;
  tabIndex: number;
  currentTab: Tab;
  rightUtilsElement?: (props: TabElementProps) => ReactElement;
  leftUtilsElement?: (props: TabElementProps) => ReactElement;
}

const TabAddButton: React.FC<TabAddButtonProps> = ({
  useTabsStoreHooks,
  horizonAreaIndex,
  verticalAreaIndex,
  tabIndex,
  currentTab,
  rightUtilsElement,
  leftUtilsElement
}) => {

  const {
    onSetPreAddTabLocation,
  } = useTabsStoreHooks;

  const tabLocation: TabLocation = useMemo(() => 
    [horizonAreaIndex, verticalAreaIndex, tabIndex]
  , [horizonAreaIndex, verticalAreaIndex, tabIndex]);

  const {
    openTooltip,
    closeTooltip
  } = useTooltip(useTabsStoreHooks, TOOLTIP_ACTION_TYPE_BY_ADD_TAB, currentTab.type);

  const setPreAddTabLocation = useCallback((e: React.MouseEvent) => {
    onSetPreAddTabLocation(tabLocation, {
      clientX: e.clientX,
      clientY: e.clientY
    });
  }, [onSetPreAddTabLocation, tabLocation]);

  const props = {
    setPreAddTabLocation,
    rightUtilsElement,
    leftUtilsElement,
    openTooltip,
    closeTooltip
  }

  return <TabAddButtonView {...props} />;
}

export default TabAddButton;