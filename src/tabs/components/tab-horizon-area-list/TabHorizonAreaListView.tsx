import React from "react";
import { TabsBaseProps } from "./TabHorizonAreaList";
import TabHorizonAreaComponent from "../tab-horizon-area";
import TabsOverlay from "../TabsOverlay";
import HorizonResizeArea from "../horizon-resize-area";
import { TabHorizonArea } from "../../store/stucts/types";
import NoneTabArea from "../none-tab-area";
import TabSelectionArea from "../TabSelectionArea";

interface TabHorizonAreaListViewProps extends TabsBaseProps {
  tabHorizonAreaList: TabHorizonArea[];
  selected: boolean;
  selectionAreaStyle?: React.CSSProperties;
  isSelectActive: boolean;
  getWidth: (horizonIdx: number) => number;
  changeTargetTabLocation: () => void;
  resetTargetTabLocation: () => void;
}

const TabHorizonAreaListView: React.FC<TabHorizonAreaListViewProps> = ({
  useTabsStoreHooks,
  tabHorizonAreaList,
  selected,
  selectionAreaStyle,
  isSelectActive,
  getWidth,
  changeTargetTabLocation,
  resetTargetTabLocation
}) => (
  <div className="flex w-full h-full">

    {
      tabHorizonAreaList.length > 1 || tabHorizonAreaList[0]?
      tabHorizonAreaList.map((tabHorizonArea, idx) => (
        <TabHorizonAreaComponent
          key={idx}
          useTabsStoreHooks={useTabsStoreHooks}
          getWidth={getWidth}
          horizonAreaIndex={idx}
          {...tabHorizonArea}
        />
      ))
      : <NoneTabArea 
          useTabsStoreHooks={useTabsStoreHooks}
          tabLocation={[0, 0, 0]}
        />
    }

    <TabsOverlay>
      <HorizonResizeArea useTabsStoreHooks={useTabsStoreHooks} />
      <TabSelectionArea 
        selected={selected}
        style={selectionAreaStyle}
        isActive={isSelectActive}
        changeTargetTabLocation={changeTargetTabLocation}
        resetTargetTabLocation={resetTargetTabLocation}
      />
    </TabsOverlay>
  </div>
);

export default TabHorizonAreaListView;