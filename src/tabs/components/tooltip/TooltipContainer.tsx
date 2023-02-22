import React from "react";
import { HOVER, TOOLTIP } from "../../store/constants";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import Tooltip from "./Tooltip";

interface TooltipContainerProps extends TabsBaseProps {}

const TooltipContainer: React.FC<TooltipContainerProps> = ({
  useTabsStoreHooks
}) => {

  const {
    state: {
      hoveringType,
      isActiveTooltip,
      tooltipMessage,
      isPointerState
    }
  } = useTabsStoreHooks;

  if(
    !isActiveTooltip
    || hoveringType !== TOOLTIP
    || isPointerState !== HOVER
    || !tooltipMessage
  ) {
    return null;
  }

  const props = {
    useTabsStoreHooks,
    message: tooltipMessage
  }

  return <Tooltip {...props} />;
}

export default TooltipContainer;

