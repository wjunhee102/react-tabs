
// action types
export const CLEAR_STATE_ITEM        = "CLEAR_STATE_ITEM" as const;
export const INIT_TABS               = "INIT_TABS" as const;
export const INIT_TAB_LIST           = "INIT_TAB_LIST" as const;
export const SET_TAB_LOCATION        = "SET_TAB_LOCATION" as const;
export const SET_PRE_ADD_TAB         = "SET_PRE_ADD_TAB" as const;
export const ADD_TAB                 = "ADD_TAB" as const;
export const DELETE_TAB              = "DELETE_TAB" as const;
export const DELETE_TAB_LIST         = "DELETE_TAB_LIST" as const;
export const SET_TOOLTIP             = "SET_TOOLTIP" as const;
export const SET_CLIENT_POINT_INFO   = "SET_CLIENT_POINT_INFO" as const;
export const SET_MOVE_TAB            = "SET_MOVE_TAB" as const;
export const MOVE_TAB                = "MOVE_TAB" as const;
export const CHANGE_CURRENT_TAB      = "CHANGE_CURRENT_TAB" as const;
export const OPEN_TARGET_TAB         = "OPEN_TARGET_TAB" as const;
export const ADD_TAB_AREA            = "ADD_TAB_AREA" as const;
export const DELETE_TAB_AREA         = "DELETE_TAB_AREA" as const;
export const INIT_TABS_POSITION_INFO = "INIT_TABS_POSITION_INFO" as const;
export const SET_TABS_CONTENT_RECT   = "SET_TABS_CONTENT_RECT" as const;
export const UPDATE_AREA_POSITION    = "UPDATE_AREA_POSITION" as const;
export const SORT_AREA_POSITION      = "SORT_AREA_POSITION" as const;
export const OPEN_HOVERING_MENU      = "OPEN_HOVERING_MENU" as const;
export const CLOSE_HOVERING_MENU     = "CLOSE_HOVERING_MENU" as const;
export const SET_ACTION_PAYLOAD      = "SET_ACTION_PAYLOAD" as const;
export const CLEAR_ACTION_PAYLOAD    = "CLEAR_ACTION_PAYLOAD" as const;
export const CLEAR_OPENED_TABLOCATION = "CLEAR_OPENED_TABLOCATION" as const;

export type TABS_ACTION_TYPES = 
  typeof CLEAR_STATE_ITEM 
  | typeof INIT_TABS
  | typeof INIT_TAB_LIST
  | typeof ADD_TAB
  | typeof DELETE_TAB
  | typeof DELETE_TAB_LIST
  | typeof SET_TOOLTIP
  | typeof SET_MOVE_TAB
  | typeof MOVE_TAB
  | typeof CHANGE_CURRENT_TAB
  | typeof OPEN_TARGET_TAB
  | typeof ADD_TAB_AREA
  | typeof DELETE_TAB_AREA
  | typeof INIT_TABS_POSITION_INFO
  | typeof SET_TABS_CONTENT_RECT
  | typeof UPDATE_AREA_POSITION
  | typeof SORT_AREA_POSITION
  | typeof OPEN_HOVERING_MENU
  | typeof CLOSE_HOVERING_MENU
  | typeof SET_ACTION_PAYLOAD
  | typeof CLEAR_ACTION_PAYLOAD
  | typeof CLEAR_OPENED_TABLOCATION
;