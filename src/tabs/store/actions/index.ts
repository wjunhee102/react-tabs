import { 
  ADD_TAB,
  ADD_TAB_AREA, 
  CLEAR_STATE_ITEM, 
  DELETE_TAB, 
  DELETE_TAB_AREA, 
  INIT_TABS_POSITION_INFO, 
  UPDATE_AREA_POSITION, 
  MOVE_TAB, 
  OPEN_HOVERING_MENU, 
  SORT_AREA_POSITION,
  INIT_TAB_LIST,
  SET_CLIENT_POINT_INFO,
  SET_TABS_CONTENT_RECT,
  SET_TAB_LOCATION,
  SET_PRE_ADD_TAB,
  CLOSE_HOVERING_MENU,
  SET_MOVE_TAB,
  INIT_TABS,
  CHANGE_CURRENT_TAB,
  DELETE_TAB_LIST,
  SET_TOOLTIP,
  CLEAR_ACTION_PAYLOAD,
  SET_ACTION_PAYLOAD,
  OPEN_TARGET_TAB,
  CLEAR_OPENED_TABLOCATION
} from "./type";
import { 
  ClientPointInfo,
  ClientPointInfoProps,
  HoveringTypes,
  InitialValue,
  IsPointerState,
  SetTooltipProps,
  TabsStateKey
} from "../types";
import { 
  ChangeCurrentTabIndexInAreaListByTargetTabOptions,
  Tab, 
  TabLocation, 
  TabsContentRect 
} from "../stucts/types";
import { TabsProps } from "../..";

export function clearStateItem(...key: TabsStateKey[]) {
  return {
    type: CLEAR_STATE_ITEM,
    payload: key
  }
}

export function initTabs(payload: TabsProps) {
  return {
    type: INIT_TABS,
    payload
  }
}

export function initTabList(initTabList: Tab[][][]) {
  return {
    type: INIT_TAB_LIST,
    payload: {
      initTabList
    }
  }
}

export function setTabLocation(targetTabLocation: [number] | [number, number] | TabLocation | null) {
  return {
    type: SET_TAB_LOCATION,
    payload: {
      targetTabLocation
    }
  }
}

export function setPreAddTabLocation(
  targetTabLocation: TabLocation, 
  clientPointInfo: ClientPointInfo
) {
  return {
    type: SET_PRE_ADD_TAB,
    payload: {
      targetTabLocation,
      clientPointInfo
    }
  }
}

export function addTab(targetTab: Tab | Tab[], targetTabLocation?: [number] | [number, number] | TabLocation) {
  return {
    type: ADD_TAB,
    payload: {
      targetTab,
      targetTabLocation
    }
  }
}

export function deleteTab(targetTabLocation: TabLocation) {
  return {
    type: DELETE_TAB,
    payload: {
      targetTabLocation: targetTabLocation
    }
  }
}

export function deleteTabList( 
  typeList: string[],
  targetTabLoction?: TabLocation | [ number, number ]
) {
  return {
    type: DELETE_TAB_LIST,
    payload: {
      targetTabLoction,
      typeList
    }
  }
}

export function setPreMoveTab(
  targetTabLocation: TabLocation, 
  clientPointInfo: ClientPointInfo
) {
  return {
    type: SET_PRE_ADD_TAB,
    payload: {
      targetTabLocation,
      clientPointInfo
    }
  }
}

export function setMoveTab(
  currentTabLocation: TabLocation,
  clientPointInfo: ClientPointInfo
) {
  return {
    type: SET_MOVE_TAB,
    payload: {
      currentTabLocation,
      clientPointInfo
    }
  }
}

export function moveTab() {
  return {
    type: MOVE_TAB
  }
}

export function changeCurrentTab(
  targetTabLocation: TabLocation,
  actionPayload?: any
) {
  return {
    type: CHANGE_CURRENT_TAB,
    payload: {
      targetTabLocation,
      actionPayload
    }
  }
}

export function openTargetTab(
  targetTab: string | Tab,
  props: {
    actionPayload?: any | null;
    options?: ChangeCurrentTabIndexInAreaListByTargetTabOptions;
  }
) {
  return {
    type: OPEN_TARGET_TAB,
    payload: {
      targetTab,
      ...props
    }
  }
}

export function addTabArea(targetTab: Tab) {
  return {
    type: ADD_TAB_AREA,
    payload: {
      targetTab
    }
  }
}

export function deleteTabArea(tabIndex: number[]) {
  return {
    type: DELETE_TAB_AREA,
    payload: {
      tabIndex
    }
  }
}

export function setTooltip(setTooltipProps: SetTooltipProps) {
  return {
    type: SET_TOOLTIP,
    payload: setTooltipProps
  }
}

export function initTabsPositionInfo(initialValue: InitialValue) {
  return {
    type: INIT_TABS_POSITION_INFO,
    payload: initialValue
  }
}

export function setTabsContentRect(tabsContentRect: TabsContentRect) {
  return {
    type: SET_TABS_CONTENT_RECT,
    payload: {
      tabsContentRect
    }
  }
}

export function setClientPointInfo(
  clientPointInfoProps: ClientPointInfoProps, 
  isPointerState: IsPointerState = null
) {
  return {
    type: SET_CLIENT_POINT_INFO,
    payload: {
      clientPointInfoProps,
      isPointerState
    }
  }
}

export function updateAreaPosition(
  targetTabLocation: [number] | [number, number], 
  targetAreaPosition: number
) {
  return {
    type: UPDATE_AREA_POSITION,
    payload: {
      targetTabLocation,
      targetAreaPosition
    }
  }
}

export function sortAreaPosition() {
  return {
    type: SORT_AREA_POSITION
  }
}

export function openHoveringMenu(
  hoveringType: HoveringTypes, 
  clientPointInfo: ClientPointInfo,
  hoveringMenuProps?: any
) {
  return {
    type: OPEN_HOVERING_MENU,
    payload: {
      hoveringType,
      clientPointInfo,
      hoveringMenuProps
    }
  }
}

export function closeHoveringMenu() {
  return {
    type: CLOSE_HOVERING_MENU
  }
}

export function setActionPayload(actionPayload: any) {
  return {
    type: SET_ACTION_PAYLOAD,
    payload: actionPayload
  }
}

export function clearActionPayload() {
  return {
    type: CLEAR_ACTION_PAYLOAD
  }
}

export function clearOpenedTabLocation() {
  return {
    type: CLEAR_OPENED_TABLOCATION
  }
}

export type ClearStateItemAction       = ReturnType<typeof clearStateItem>;
export type InitTabsAction             = ReturnType<typeof initTabs>;
export type InitTabListAction          = ReturnType<typeof initTabList>;
export type SetTabLocationAction       = ReturnType<typeof setTabLocation>;
export type SetPreAddTabLocationAction = ReturnType<typeof setPreAddTabLocation>;
export type AddTabAction               = ReturnType<typeof addTab>;
export type DeleteTabAction            = ReturnType<typeof deleteTab>;
export type DeleteTabListAction        = ReturnType<typeof deleteTabList>;
export type SetTooltipAction           = ReturnType<typeof setTooltip>;
export type SetMoveTabAction           = ReturnType<typeof setMoveTab>;
export type MoveTabAction              = ReturnType<typeof moveTab>;
export type ChangeCurrentTabAction     = ReturnType<typeof changeCurrentTab>;
export type OpenTargetTabAction        = ReturnType<typeof openTargetTab>;
export type AddTabAreaAction           = ReturnType<typeof addTabArea>;
export type DeleteTabAreaAction        = ReturnType<typeof deleteTabArea>;       
export type InitTabsPositionInfoAction = ReturnType<typeof initTabsPositionInfo>;
export type SetTabsContentRectAction   = ReturnType<typeof setTabsContentRect>;
export type SetClientPointInfoAction   = ReturnType<typeof setClientPointInfo>;
export type SortAreaPositionAction     = ReturnType<typeof sortAreaPosition>;
export type UpdateAreaPositionAction   = ReturnType<typeof updateAreaPosition>;
export type OpenHoveringAction         = ReturnType<typeof openHoveringMenu>;
export type CloseHoveringAction        = ReturnType<typeof closeHoveringMenu>;
export type SetActionPayloadAction     = ReturnType<typeof setActionPayload>;
export type ClearActionPayloadAction   = ReturnType<typeof clearActionPayload>;
export type ClearOpenedTabLocationAction = ReturnType<typeof clearOpenedTabLocation>;

export type TabsActions = 
  ClearStateItemAction
  | InitTabsAction
  | InitTabListAction
  | SetTabLocationAction
  | SetPreAddTabLocationAction
  | AddTabAction
  | DeleteTabAction
  | DeleteTabListAction
  | SetMoveTabAction
  | SetTooltipAction
  | MoveTabAction
  | ChangeCurrentTabAction
  | OpenTargetTabAction
  | AddTabAreaAction
  | DeleteTabAreaAction
  | InitTabsPositionInfoAction
  | SetTabsContentRectAction
  | SetClientPointInfoAction
  | SortAreaPositionAction
  | UpdateAreaPositionAction
  | OpenHoveringAction
  | SetActionPayloadAction
  | ClearActionPayloadAction
  | CloseHoveringAction
  | ClearOpenedTabLocationAction
;
