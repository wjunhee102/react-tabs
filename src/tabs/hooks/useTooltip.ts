import { useCallback } from "react";
import { TOOLTIP } from "../store/constants";
import { TooltipActionTypes } from "../store/types";
import { UseTabsStoreType } from "./useTabsStore";

export function useTooltip(
  useTabsStoreHooks: UseTabsStoreType,
  type: TooltipActionTypes,
  targetInfo: string
) {

  const {
    state: {
      hoveringType
    },
    onSetTooltip,
    onCloseHoveringMenu
  } = useTabsStoreHooks;

  const openTooltip = useCallback((e: React.MouseEvent) => {
    if(!hoveringType) {
      onSetTooltip({
        clientPointInfo: {
          clientX: e.clientX,
          clientY: e.clientY
        },
        type,
        targetInfo
      });
    }
  }, [onSetTooltip, hoveringType, type, targetInfo]);

  const closeTooltip = useCallback(() => {
    if(hoveringType === TOOLTIP) {
      onCloseHoveringMenu();
    }
  }, [onCloseHoveringMenu, hoveringType]);

  return {
    openTooltip,
    closeTooltip
  }
}