import React, { useCallback, useMemo } from "react";
import { TabLocation } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabAreaSelectMenuView from "./TabAreaSelectMenuView";

interface TabAreaSelectMenuProps extends TabsBaseProps {
  tabLocation: TabLocation;
}

const TabAreaSelectMenu: React.FC<TabAreaSelectMenuProps> = ({
  useTabsStoreHooks,
  tabLocation
}) => {

  const {
    state: {
      adjustmentClientX,
      adjustmentClientY,
      tabsContentRect,
      tabHorizonAreaList
    },
    onSetTabLocation,
    onAddTab,
    onMoveTab,
    onCloseHoveringMenu
  } = useTabsStoreHooks;

  const tab = useMemo(() => 
    tabHorizonAreaList.checkIfTabExists(tabLocation)
  , [tabHorizonAreaList, tabLocation]);

  const position = useMemo(() => {

    const width = tabsContentRect.width - 180;
    const height = tabsContentRect.height - 307;

    let left = adjustmentClientX - 6;
    let top  = adjustmentClientY - 2;

    let position: {
      left?: string;
      top?: string;
      right?: string;
      bottom?: string;
    } = {
      left: `${left}px`,
      top: `${top}px`
    }

    if(left > width) {

      delete position.left;
      
      position.right = "4px";

    }

    if(top > height) {

      delete position.top;

      position.bottom = "4px";

    }

    return position;
  }, [tabsContentRect, adjustmentClientX, adjustmentClientY]);

  const locationList: [[number], [number], [number, number]] = useMemo(() => {

    const left: [number] = tabLocation[0]? [tabLocation[0] - 1] : [0];

    const right: [number] = [tabLocation[0] + 1];

    const bottom: [number, number] = [tabLocation[0], tabLocation[1] + 1];

    return [right, left, bottom];
  }, [tabLocation]);

  const addTab = useCallback(() => {
    if(tab) {
      onAddTab(tab);
    }
  }, [onAddTab, tab]);

  const freeTabLocation = useCallback(() => {
    onSetTabLocation(null);
  }, [onSetTabLocation]);

  if(!tab) {
    return null;
  }

  const props = {
    position,
    show: true,
    locationList,
    onCloseHoveringMenu,
    addTab,
    onMoveTab,
    onSetTabLocation,
    freeTabLocation
  }

  return <TabAreaSelectMenuView {...props} />;
}

export default TabAreaSelectMenu;