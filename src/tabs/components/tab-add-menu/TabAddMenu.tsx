import React, { useEffect, useMemo, useRef } from "react";
import { TabArray } from "../../store/stucts/tabArray";
import { Tab } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabAddMenuView from "./TabAddMenuView";

interface TabAddMenuProps extends TabsBaseProps {
}

const TabAddMenu: React.FC<TabAddMenuProps> = ({
  useTabsStoreHooks
}) => {

  const menuRef = useRef<HTMLDivElement>(null);

  const {
    state: {
      isActiveAddTabListMenu,
      adjustmentClientX,
      adjustmentClientY,
      tabsContentRect,
      tabElementTable
    },
    onAddTab,
    onCloseHoveringMenu
  } = useTabsStoreHooks;

  const tabList: Tab[] = useMemo(() => 
    Object.entries(tabElementTable)
          .filter(([key, { isInAddMenu }]) => isInAddMenu)
          .map(([key, { icon }]) => 
            TabArray.createTab(key, { icon })
          )
  , [tabElementTable]);

  const position = useMemo(() => {

    const width = tabsContentRect.width - 150;
    const height = tabsContentRect.height - 200;

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

  useEffect(() => {
    if(!tabList[0]) {
      onCloseHoveringMenu();
    }
  }, [tabList, onCloseHoveringMenu]);

  if(!tabList[0]) {
    return null;
  }

  const props = {
    position,
    show: true,
    tabList,
    tabElementTable,
    isList: isActiveAddTabListMenu,
    menuRef,
    onAddTab
  }

  return <TabAddMenuView {...props} />;
}

export default TabAddMenu;