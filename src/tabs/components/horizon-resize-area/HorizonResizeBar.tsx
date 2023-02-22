import React, { useMemo } from 'react';

interface HorizonResizeBarProps {
  isResizing: boolean;
  areaPositionLocation: number;
  areaPosition: number;
  resizeHorizonPosition: (areaPositionLocation: number) => (e: any) => void;
  endResizeHorizonPosition: () => void;
  startResizeHorizonPosition: (areaPositionLocation: number, areaPosition: number) => (e: any) => void;
  openTooltip: (e: React.MouseEvent) => void;
}

const HorizonResizeBar: React.FC<HorizonResizeBarProps> = ({
  isResizing,
  areaPositionLocation,
  areaPosition,
  resizeHorizonPosition,
  startResizeHorizonPosition,
  endResizeHorizonPosition,
  openTooltip
}) => {
  
  const startResizePosition = useMemo(() => (
    startResizeHorizonPosition(areaPositionLocation, areaPosition)
  ), [startResizeHorizonPosition, areaPositionLocation, areaPosition]);

  const resizePosition = useMemo(() => (
    resizeHorizonPosition(areaPositionLocation)
  ), [resizeHorizonPosition, areaPositionLocation]);

  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full cursor-col-resize group" 
      style={{
        pointerEvents: isResizing? "auto" : "none"
      }}
      onMouseMove={resizePosition}
      onMouseUp={endResizeHorizonPosition}
      onMouseEnter={openTooltip}
      onMouseLeave={endResizeHorizonPosition}
    >
      <div 
        className="absolute top-0 left-0 z-20 h-full px-1 pointer-events-auto hover:bg-opacity-50 group-hover:bg-opacity-50 cursor-col-resize hover:bg-gray-300 group-hover:bg-gray-300"
        style={{
          transform: `translateX(${areaPosition - 4}px)`
        }}
        onMouseDown={startResizePosition}
      >
        <div className="w-[1px] h-full bg-gray-300"></div>
      </div>
    </div>
  );
}

export default HorizonResizeBar;