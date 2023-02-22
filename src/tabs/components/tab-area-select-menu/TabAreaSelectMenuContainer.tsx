import React from "react";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabAreaSelectMenu from "./TabAreaSelectMenu";

interface TabAreaSelectMenuContainerProps extends TabsBaseProps {}

const TabAreaSelectMenuContainer: React.FC<TabAreaSelectMenuContainerProps> = ({
  useTabsStoreHooks
}) => {

  const {
    state: {
      currentTabLocation,
      hoveringType
    }
  } = useTabsStoreHooks;


  if(!currentTabLocation || hoveringType !== "SELECT_AREA") {
    return null;
  }

  const props = {
    tabLocation: currentTabLocation,
    useTabsStoreHooks
  }

  return <TabAreaSelectMenu {...props} />;
}

export default TabAreaSelectMenuContainer;