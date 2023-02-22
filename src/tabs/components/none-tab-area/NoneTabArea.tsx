import React, { useCallback } from "react";
import { TabLocation } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import NoneTabAreaView from "./NoneTabAreaView";

interface NoneTabAreaProps extends TabsBaseProps {
  tabLocation: TabLocation;
  verticalAreaStyle?: { height: string };
}

const NoneTabArea: React.FC<NoneTabAreaProps> = ({
  useTabsStoreHooks,
  tabLocation,
  verticalAreaStyle
}) => {

  const {
    onSetPreAddTabLocation
  } = useTabsStoreHooks;

  const setPreAddTabLocation = useCallback((e: React.MouseEvent) => {
    onSetPreAddTabLocation(tabLocation, {
      clientX: e.clientX,
      clientY: e.clientY
    });
  }, [onSetPreAddTabLocation, tabLocation]);

  const props = {
    setPreAddTabLocation,
    verticalAreaStyle
  }

  return <NoneTabAreaView {...props} />;
}

export default NoneTabArea;