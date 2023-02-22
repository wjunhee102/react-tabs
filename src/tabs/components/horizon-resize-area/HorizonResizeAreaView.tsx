import React from "react";
import { TabHorizonArea } from "../../store/stucts/types";
import HorizonResizeBar from "./HorizonResizeBar";

interface HorizonResizeAreaViewProps {
  tabHorizonAreaList: TabHorizonArea[];
  currentResizingArea: number;
  resizeHorizonPosition: (areaPositionLocation: number) => (e: any) => void;
  endResizeHorizonPosition: () => void;
  startResizeHorizonPosition: (areaPositionLocation: number, areaPosition: number) => (e: any) => void;
  openTooltip: (e: React.MouseEvent) => void;
}

const HorizonResizeAreaView: React.FC<HorizonResizeAreaViewProps> = ({
  tabHorizonAreaList,
  currentResizingArea,
  resizeHorizonPosition,
  endResizeHorizonPosition,
  startResizeHorizonPosition,
  openTooltip
}) => {
  return (
    <div className="relative z-10 w-full h-full pointer-events-none">
      {
        tabHorizonAreaList[0] !== undefined?
        tabHorizonAreaList.map(({ areaPosition }, idx) => (
          idx?
          <HorizonResizeBar 
            key={idx}
            isResizing={idx === currentResizingArea}
            areaPositionLocation={idx}
            areaPosition={areaPosition}
            startResizeHorizonPosition={startResizeHorizonPosition}
            resizeHorizonPosition={resizeHorizonPosition}
            openTooltip={openTooltip}
            endResizeHorizonPosition={endResizeHorizonPosition}
          />
          : null
        ))
        : null
      }
    </div>
  );
}

export default HorizonResizeAreaView;