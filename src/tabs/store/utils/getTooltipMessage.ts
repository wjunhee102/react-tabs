import { TOOLTIP_ACTION_TYPE_BY_ADD_TAB, TOOLTIP_ACTION_TYPE_BY_RESIZE_BAR, TOOLTIP_ACTION_TYPE_BY_TAB, TOOLTIP_TYPE_BY_HORIZON } from "../constants";
import { TabsState, TooltipActionTypes } from "../types";

export function getTooltipMessage(
  state: TabsState,
  type: TooltipActionTypes,
  targetInfo: string,
): string | null | undefined {

  if(type === TOOLTIP_ACTION_TYPE_BY_TAB) {

    const targetTabTable = state.tabElementTable[targetInfo];

    if(targetTabTable) {
      return targetTabTable.tooltipMessage;
    }

    return null;
  } else if(type === TOOLTIP_ACTION_TYPE_BY_ADD_TAB) {

    const targetTabTable = state.tabElementTable[targetInfo];

    if(targetTabTable && targetTabTable.tooltipMessageByAddButton) {
      return targetTabTable.tooltipMessageByAddButton;
    }

    return state.tooltipMessageByAddTabButton;
  } else if(type === TOOLTIP_ACTION_TYPE_BY_RESIZE_BAR) {

    if(targetInfo === TOOLTIP_TYPE_BY_HORIZON) {
      return state.tooltipMessageByHosizonResizeBar;
    } 

    return state.tooltipMessageByVerticalResizeBar;
  }

  return null;
}