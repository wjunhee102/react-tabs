import React from "react";
import Tabs from "./Tabs";
import { TabsProps } from ".";
import useTabsStore from "./hooks/useTabsStore";

const TabsCoveredInHooks: React.FC<TabsProps> = (tabsProps) => (
  <Tabs 
    {...tabsProps}
    useTabsStoreHooks={useTabsStore()}
  />
)

const TabsContainer: React.FC<TabsProps> = (tabsProps) => {

  if(tabsProps.useTabsStoreHooks) {
    return (
      <Tabs 
        {...tabsProps}
        useTabsStoreHooks={tabsProps.useTabsStoreHooks}
      />
    );
  }

  return <TabsCoveredInHooks {...tabsProps} />;
}

export default TabsContainer;