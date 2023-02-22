import React, { useCallback, useMemo } from "react";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TooltipView from "./TooltipView";

interface TooltipProps extends TabsBaseProps {
  message: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  useTabsStoreHooks,
  message
}) => {

  const {
    state: {
      adjustmentClientX,
      adjustmentClientY,
      tabsContentRect
    },
    onCloseHoveringMenu
  } = useTabsStoreHooks;

  const position = useMemo(() => {

    const width = tabsContentRect.width - (message.length * 13);
    const height = tabsContentRect.height;

    let left = adjustmentClientX + 10;
    let top  = adjustmentClientY + 6;

    let position: {
      left?: string;
      top?: string;
      right?: string;
      bottom?: string;
    } = {
      left: `${left}px`,
      top: `${top}px`
    }

    if(left > width) {

      delete position.left;
      
      position.right = "10px";

    }

    if(top > height) {

      delete position.top;

      position.bottom = "4px";

    }

    return position;
  }, [message, tabsContentRect, adjustmentClientX, adjustmentClientY]);

  const closeTooltip = useCallback(() => {
    onCloseHoveringMenu();
  }, [onCloseHoveringMenu]);

  const props = {
    style: position,
    message,
    closeTooltip
  }

  return <TooltipView {...props} />;
}

export default Tooltip;