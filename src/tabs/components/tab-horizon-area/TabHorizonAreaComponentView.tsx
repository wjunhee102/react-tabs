import React from "react";
import { TabVeticalArea } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabVerticalAreaComponent from "../tab-vertical-area";
import TabSelectionArea from "../TabSelectionArea";
import TabsOverlay from "../TabsOverlay";
import VerticalResizeArea from "../vertical-resize-area";

interface TabHorizonAreaComponentViewProps extends TabsBaseProps {
  horizonAreaStyle: { width: string };
  verticalAreaList: TabVeticalArea[];
  horizonAreaIndex: number;
  areaPosition: number;
  selected: boolean;
  selectionAreaStyle?: React.CSSProperties;
  isSelectActive: boolean;
  getHeight: (verticalIdx: number) => number;
  changeTargetTabLocation: () => void;
  resetTargetTabLocation: () => void;
}

const TabHorizonAreaComponentView: React.FC<TabHorizonAreaComponentViewProps> = ({
  useTabsStoreHooks,
  horizonAreaStyle,
  verticalAreaList,
  horizonAreaIndex,
  areaPosition,
  selected,
  selectionAreaStyle,
  isSelectActive,
  getHeight,
  changeTargetTabLocation,
  resetTargetTabLocation
}) => {
  return (
    <div 
      className="h-full"
      style={horizonAreaStyle}
    >

      {
        verticalAreaList.map((verticalArea, idx) => (
          <TabVerticalAreaComponent
            key={idx}
            useTabsStoreHooks={useTabsStoreHooks}
            getHeight={getHeight}
            horizonAreaIndex={horizonAreaIndex}
            verticalAreaIndex={idx}
            {...verticalArea}
          />
        ))
      }

      <TabsOverlay>
        <VerticalResizeArea 
          useTabsStoreHooks={useTabsStoreHooks} 
          areaPosition={areaPosition}
          horizonAreaStyle={horizonAreaStyle}
          horizonAreaIndex={horizonAreaIndex}
          verticalAreaList={verticalAreaList}
        />
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
}

export default TabHorizonAreaComponentView;