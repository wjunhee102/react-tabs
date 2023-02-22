import React from "react";

interface TooltipViewProps {
  style?: React.CSSProperties;
  message?: string; 
  closeTooltip?: () => void;
}

const TooltipView: React.FC<TooltipViewProps> = ({
  style,
  message,
  closeTooltip
}) => (
  <div
    className="absolute w-auto h-auto rounded opacity-90 text-md bg-main"
    style={style}
    onMouseLeave={closeTooltip}
  >
    <p className="px-3 py-1.5 text-white box-contents h-fit whitespace-nowrap text-center">{message}</p>
  </div>
);

export default TooltipView;