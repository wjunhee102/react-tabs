import { TabsActions } from "./actions";
import tabsHandlers from "./handlers";
import { TabArray } from "./stucts/tabArray";
import { TabsState } from "./types";
import { createReducer } from "./utils/reducerUtils";

export const initialTabsState: TabsState = {
  id: null,
  isPointerState: null,
  actionPayload: null,
  clientX: 0,
  clientY: 0,
  adjustmentClientX: 0,
  adjustmentClientY: 0,
  positionValue: {
    x: 0,
    y: 0
  },
  tabsContentRect: {
    width: 0,
    height: 0
  },
  tabHorizonAreaList: new TabArray(),
  currentTabLocation: null,
  targetTabLocation: null,
  openedTabLocation: null,
  hoveringType: null,
  hoveringMenuProps: null,
  tabElementTable: {},
  tooltipMessage: null,
  tooltipMessageByAddTabButton: null,
  tooltipMessageByHosizonResizeBar: null,
  tooltipMessageByVerticalResizeBar: null,
  isSetAreaPostion: false,
  isSaveLocalStorage: false,
  isActiveAddTabMenu: true,
  isActiveAddTabListMenu: false,
  isActiveDefaultUtilMenu: true,
  isActiveDeleteTabButton: true,
  isActiveTooltip: false,
  isMemorizeTab: false
}

const tabsReducer = createReducer<TabsState, TabsActions>(initialTabsState, tabsHandlers);

export default tabsReducer;