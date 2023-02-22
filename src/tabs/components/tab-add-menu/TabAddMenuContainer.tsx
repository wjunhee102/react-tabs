import React from "react";
import { ADD_TAB } from "../../store/constants";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabAddMenu from "./TabAddMenu";

interface TabAddMenuContainerProps extends TabsBaseProps {}

const TabAddMenuContainer: React.FC<TabAddMenuContainerProps> = ({
  useTabsStoreHooks
}) => {

  const {
    state: {
      isActiveAddTabMenu,
      hoveringType
    },
  } = useTabsStoreHooks;  

  if(
    !isActiveAddTabMenu 
    || hoveringType !== ADD_TAB
  ) {    
    return null;
  }

  const props = {
    useTabsStoreHooks
  }

  return <TabAddMenu {...props} />;
}

export default TabAddMenuContainer;