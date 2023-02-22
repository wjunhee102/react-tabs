
// hovering types
export const ADD_TAB     = "ADD_TAB" as const;
export const SELECT_AREA = "SELECT_AREA" as const;
export const MOVE_TAB    = "MOVE_TAB" as const;
export const TOOLTIP     = "TOOLTIP" as const;

// is pointer state
export const GRAB   = "grab" as const;
export const DROP   = "drop" as const;
export const RESIZE = "resize" as const;
export const HOVER  = "hover" as const;

// tooltip action type
export const TOOLTIP_ACTION_TYPE_BY_TAB        = "tab";
export const TOOLTIP_ACTION_TYPE_BY_ADD_TAB    = "addTab";
export const TOOLTIP_ACTION_TYPE_BY_RESIZE_BAR = "resizeBar"; 

// tooltip types
export const TOOLTIP_TYPE_BY_HORIZON  = "horizon";
export const TOOLTIP_TYPE_BY_VERTICAL = "vertical";