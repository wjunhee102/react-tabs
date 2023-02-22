import React, { useMemo } from 'react';

interface VerticalResizeBarProps {
  isResizing: boolean;
  areaPositionLocation: number;
  areaPosition: number;
  resizeVerticalPosition: (areaPositionLocation: number) => (e: any) => void;
  openTooltip: (e: React.MouseEvent) => void;
  endResizeVerticalPosition: () => void;
  startResizeVerticalPosition: (areaPositionLocation: number, areaPosition: number) => (e: any) => void;
}

const VerticalResizeBar: React.FC<VerticalResizeBarProps> = ({
  isResizing,
  areaPositionLocation,
  areaPosition,
  openTooltip,
  resizeVerticalPosition,
  startResizeVerticalPosition,
  endResizeVerticalPosition
}) => {
  
  const startResizePosition = useMemo(() => (
    startResizeVerticalPosition(areaPositionLocation, areaPosition)
  ), [startResizeVerticalPosition, areaPositionLocation, areaPosition]);

  const resizePosition = useMemo(() => (
    resizeVerticalPosition(areaPositionLocation)
  ), [resizeVerticalPosition, areaPositionLocation]);

  return (
    <div 
      className="absolute top-0 left-0 z-10 w-full h-full cursor-row-resize group" 
      style={{
        pointerEvents: isResizing? "auto" : "none"
      }}
      onMouseMove={resizePosition}
      onMouseUp={endResizeVerticalPosition}
      onMouseEnter={openTooltip}
      onMouseLeave={endResizeVerticalPosition}
    >
      <div 
        className="absolute top-0 left-0 z-20 w-full py-1 pointer-events-auto hover:bg-opacity-50 cursor-row-resize hover:bg-gray-300 group-hover:bg-opacity-50 group-hover:bg-gray-300"
        style={{
          transform: `translateY(${areaPosition - 4}px)`
        }}
        onMouseDown={startResizePosition}
      >
        <div className="h-[1px] w-full bg-gray-300"></div>
      </div>
    </div>
  );
}

export default VerticalResizeBar;