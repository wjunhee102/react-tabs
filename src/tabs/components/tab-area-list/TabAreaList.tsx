import React from "react";
import { Tab, TabLocation } from "../../store/stucts/types";
import TabArea from "../tab-area/TabArea";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";

interface TabListProps extends TabsBaseProps {
  tabLocation: TabLocation;
  tabList: Tab[];
}

const TabAreaList: React.FC<TabListProps> = ({
  useTabsStoreHooks,
  tabLocation,
  tabList
}) => {

  const {
    state: {
      isMemorizeTab
    }
  } = useTabsStoreHooks;

  if(!isMemorizeTab) {
    return ( 
      <TabArea 
        useTabsStoreHooks={useTabsStoreHooks}
        tabLocation={tabLocation}
        tabList={tabList}
        currentTabIndex={tabLocation[2]}
      />
    )
  }

  return(
    <React.Fragment>
      {
        tabList.map((tab, index) => (
          <TabArea 
            key={tab.type}
            useTabsStoreHooks={useTabsStoreHooks}
            currentTabIndex={index}
            tabLocation={tabLocation}
            tabList={tabList}
          />
        ))
      }
    </React.Fragment>
  );
};

export default TabAreaList;