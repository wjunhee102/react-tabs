import React, { ReactElement } from "react";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabBar from "../tab-bar";
import { Tab, TabLocation } from "../../store/stucts/types";
import { TabElementProps } from "../..";
import TabAreaList from "../tab-area-list";

interface TabVerticalAreaComponentViewProps extends TabsBaseProps {
  verticalAreaStyle: { height: string };
  tabAreaStyle: { height: string };
  tabList: Tab[];
  tabLocation: TabLocation;
  rightUtilsElement?: (props: TabElementProps) => ReactElement;
  leftUtilsElement?: (props: TabElementProps) => ReactElement;
}

const TabVerticalAreaComponentView = React.forwardRef<HTMLDivElement, TabVerticalAreaComponentViewProps>(({
  useTabsStoreHooks,
  verticalAreaStyle,
  tabAreaStyle,
  tabList,
  tabLocation,
  rightUtilsElement,
  leftUtilsElement
}, ref) => (
  <div
    className="flex flex-col justify-start w-full"
    style={verticalAreaStyle}
    ref={ref}
  >
    <TabBar 
      useTabsStoreHooks={useTabsStoreHooks}
      tabLocation={tabLocation}
      tabList={tabList}
      rightUtilsElement={rightUtilsElement}
      leftUtilsElement={leftUtilsElement}
    />
    
    <div 
      className="w-full"
      style={tabAreaStyle}
    >
      <TabAreaList 
        useTabsStoreHooks={useTabsStoreHooks}
        tabList={tabList}
        tabLocation={tabLocation}
      />
    </div>
  </div>
));

export default TabVerticalAreaComponentView;