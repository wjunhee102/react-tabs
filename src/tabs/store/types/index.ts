import { TabElementTable } from "../..";
import { 
  ADD_TAB, 
  DROP, 
  GRAB, 
  HOVER, 
  MOVE_TAB, 
  RESIZE, 
  SELECT_AREA, 
  TOOLTIP, 
  TOOLTIP_ACTION_TYPE_BY_ADD_TAB, 
  TOOLTIP_ACTION_TYPE_BY_RESIZE_BAR, 
  TOOLTIP_ACTION_TYPE_BY_TAB 
} from "../constants";
import { TabArray } from "../stucts/tabArray";
import { 
  TabLocation, 
  TabsContentRect 
} from "../stucts/types";

/**
 * current tab는 각 tabArea안에서 가지고 있을 것.
 * 각 영역에 대한 tab list가 없을 경우 자동으로 그 배열은 삭제
 * tab list들은 width 값과 left 값을 가지고 있음.
 */

export interface PositionValue {
  x: number;
  y: number;
}

export interface ClientPointInfo {
  clientX: number;
  clientY: number;
}

export type TooltipActionTypes = typeof TOOLTIP_ACTION_TYPE_BY_TAB
  | typeof TOOLTIP_ACTION_TYPE_BY_ADD_TAB
  | typeof TOOLTIP_ACTION_TYPE_BY_RESIZE_BAR
;

export interface SetTooltipProps {
  clientPointInfo: ClientPointInfo;
  type: TooltipActionTypes;
  targetInfo: string;
}

export interface InitialValue {
  tabsContentRect: TabsContentRect;
  positionValue?: PositionValue;
}

export type ClientPointInfoProps =  {
  [P in keyof ClientPointInfo]?: ClientPointInfo[P];
}

export type TabsContentRectProps = {
  [P in keyof TabsContentRect]?: TabsContentRect[P];
}

export type HoveringTypes = typeof ADD_TAB
  | typeof SELECT_AREA
  | typeof MOVE_TAB
  | typeof TOOLTIP
  | typeof RESIZE
;

/**
 * 첫번째 depth는 수평
 * 두번째 depth는 수직
 */

export type IsPointerState = null
  | typeof GRAB
  | typeof DROP
  | typeof RESIZE
  | typeof HOVER
;

export interface TabsState {
  id: string | null;
  isPointerState: IsPointerState;
  actionPayload: any | null;
  clientX: number;
  clientY: number;
  adjustmentClientX: number;
  adjustmentClientY: number;
  tabsContentRect: TabsContentRect;
  positionValue: PositionValue;
  tabHorizonAreaList: TabArray;
  currentTabLocation: TabLocation | null;
  targetTabLocation: [number] | [number, number] | TabLocation | null;
  openedTabLocation: TabLocation | null;
  hoveringType: HoveringTypes | null;
  hoveringMenuProps: any;
  tabElementTable: TabElementTable;
  tooltipMessage: string | null;
  tooltipMessageByAddTabButton: string | null;
  tooltipMessageByVerticalResizeBar: string | null;
  tooltipMessageByHosizonResizeBar: string | null;
  isSetAreaPostion: boolean;
  isSaveLocalStorage: boolean;
  isActiveAddTabMenu: boolean;
  isActiveAddTabListMenu: boolean;
  isActiveDeleteTabButton: boolean;
  isActiveDefaultUtilMenu: boolean;
  isActiveTooltip: boolean;
  isMemorizeTab: boolean; 
}

export type TabsStateKey = keyof TabsState;

export type TabsStateProps = {
  [P in TabsStateKey]?: TabsState[P];
}