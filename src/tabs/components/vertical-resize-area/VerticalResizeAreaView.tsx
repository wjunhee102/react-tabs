import React from "react";
import { TabVeticalArea } from "../../store/stucts/types";
import VerticalResizeBar from "./VerticalResizeBar";

interface VerticalResizeAreaViewProps {
  verticalResizeAreaStyle: { width: string; transform: string };
  verticalAreaList: TabVeticalArea[];
  currentResizingArea: number;
  resizeVerticalPosition: (areaPositionLocation: number) => (e: any) => void;
  endResizeVerticalPosition: () => void;
  startResizeVerticalPosition: (areaPositionLocation: number, areaPosition: number) => (e: any) => void;
  openTooltip: (e: React.MouseEvent) => void;
}

const VerticalResizeAreaView: React.FC<VerticalResizeAreaViewProps> = ({
  verticalResizeAreaStyle,
  verticalAreaList,
  currentResizingArea,
  resizeVerticalPosition,
  endResizeVerticalPosition,
  startResizeVerticalPosition,
  openTooltip
}) => {
  return (
    <div 
      className="relative z-10 w-full h-full pointer-events-none"
      style={verticalResizeAreaStyle}
    >
      {
        verticalAreaList[0] !== undefined?
        verticalAreaList.map(({ areaPosition }, idx) => (
          idx?
          <VerticalResizeBar 
            key={idx}
            isResizing={idx === currentResizingArea}
            areaPositionLocation={idx}
            areaPosition={areaPosition}
            startResizeVerticalPosition={startResizeVerticalPosition}
            resizeVerticalPosition={resizeVerticalPosition}
            openTooltip={openTooltip}
            endResizeVerticalPosition={endResizeVerticalPosition}
          />
          : null 
        ))
        : null
      }
    </div>
  );
}

export default VerticalResizeAreaView;