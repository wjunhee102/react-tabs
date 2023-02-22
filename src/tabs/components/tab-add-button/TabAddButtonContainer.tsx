import React, { ReactElement } from "react";
import { TabElementProps } from "../..";
import { Tab } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabAddButton from "./TabAddButton";

interface TabAddButtonContainerProps extends TabsBaseProps {
  horizonAreaIndex: number;
  verticalAreaIndex: number;
  tabIndex: number;
  currentTab: Tab;
  rightUtilsElement?: (props: TabElementProps) => ReactElement;
  leftUtilsElement?: (props: TabElementProps) => ReactElement;
}

const TabAddButtonContainer: React.FC<TabAddButtonContainerProps> = (props) => {
  
  const { 
    useTabsStoreHooks: {
      state: {
        isActiveAddTabMenu
      }
    } 
  } = props;

  return isActiveAddTabMenu? <TabAddButton {...props} /> : null;
}

export default TabAddButtonContainer;