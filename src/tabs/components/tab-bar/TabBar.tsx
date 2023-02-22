import React, { ReactElement } from "react";
import { Tab, TabLocation } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabAddButton from "../tab-add-button";
import TabButton from "../tab-button";
import TabUtilsBar from "../tab-utils-bar";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { TabElementProps } from "../..";

interface TabBarProps extends TabsBaseProps {
  tabLocation: TabLocation;
  tabList: Tab[];
  rightUtilsElement?: (props: TabElementProps) => ReactElement;
  leftUtilsElement?: (props: TabElementProps) => ReactElement;
}

const TabBar: React.FC<TabBarProps> = ({
  useTabsStoreHooks,
  tabLocation,
  tabList,
  rightUtilsElement,
  leftUtilsElement
}) => {
  return (
    <div className="w-full relative h-12 pb-[1px] after:absolute after:w-full after:h-[1px] after:left-0 after:bottom-0 after:bg-lightGray-20 overflow-hidden">
      
      <OverlayScrollbarsComponent
        className="box-content flex-none w-full h-full"
        options={{
          scrollbars: {
            autoHide: "scroll"
          },
          overflowBehavior: {
            x: "scroll",
            y: "hidden"
          }
        }}
      >
        <div className="box-content relative flex items-center h-full w-fit flex-gap-none">
          {
            tabList.map((tab, idx) => (
              <TabButton
                key={idx}
                useTabsStoreHooks={useTabsStoreHooks} 
                isActive={idx === tabLocation[2]}
                horizonAreaIndex={tabLocation[0]}
                verticalAreaIndex={tabLocation[1]}
                tabIndex={idx}
                tab={tab}
              />
            ))
          }
          <TabAddButton 
            useTabsStoreHooks={useTabsStoreHooks}
            horizonAreaIndex={tabLocation[0]}
            verticalAreaIndex={tabLocation[1]}
            currentTab={tabList[tabLocation[2]]}
            tabIndex={tabList.length}
            rightUtilsElement={rightUtilsElement}
            leftUtilsElement={leftUtilsElement}
          />
        </div>
      </OverlayScrollbarsComponent>

      <TabUtilsBar 
        useTabsStoreHooks={useTabsStoreHooks}
        horizonAreaIndex={tabLocation[0]}
        verticalAreaIndex={tabLocation[1]}
        tabIndex={tabList.length}
        rightUtilsElement={rightUtilsElement}
        leftUtilsElement={leftUtilsElement}
      />
    </div>
  );
}

export default TabBar;