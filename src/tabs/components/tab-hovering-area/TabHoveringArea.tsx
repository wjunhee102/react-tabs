import React from "react";
import { TOOLTIP } from "../../store/constants";
import TabAddMenu from "../tab-add-menu";
import TabAreaSelectMenu from "../tab-area-select-menu";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import Tooltip from "../tooltip";

const POINTER_EVENTS_AUTO = "pointer-events-auto";
const POINTER_EVENTS_NONE = "pointer-events-none";

interface TabHoveringAreaProps extends TabsBaseProps {
}

const TabHoveringArea: React.FC<TabHoveringAreaProps> = ({
  useTabsStoreHooks
}) => {

  const {
    state: {
      hoveringType
    },
    onCloseHoveringMenu
  } = useTabsStoreHooks;

  return (
    <div className={`w-full h-full ${hoveringType === TOOLTIP? POINTER_EVENTS_NONE : POINTER_EVENTS_AUTO}`}>
      <div 
        className="w-full h-full"
        onClick={onCloseHoveringMenu}
      >
      </div>
      <TabAddMenu useTabsStoreHooks={useTabsStoreHooks} />
      <TabAreaSelectMenu useTabsStoreHooks={useTabsStoreHooks} />
      <Tooltip useTabsStoreHooks={useTabsStoreHooks} />
    </div>
  );
}

export default TabHoveringArea;