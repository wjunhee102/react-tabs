import React from "react";
import { MOVE_TAB, RESIZE } from "../../store/constants";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabHoveringArea from "./TabHoveringArea";

interface TabHoveringAreaContainerProps extends TabsBaseProps {

}

const TabHoveringAreaContainer: React.FC<TabHoveringAreaContainerProps> = ({
  useTabsStoreHooks
}) => {

  const {
    state: {
      hoveringType
    } 
  } = useTabsStoreHooks;


  if(
    !hoveringType 
    || hoveringType === RESIZE
    || hoveringType === MOVE_TAB
  ) {
    return null;
  }

  return <TabHoveringArea useTabsStoreHooks={useTabsStoreHooks} />;
}

export default TabHoveringAreaContainer;