import { initialTabsState } from ".";
import { 
  ADD_TAB, 
  CLEAR_STATE_ITEM, 
  DELETE_TAB, 
  INIT_TABS, 
  INIT_TAB_LIST, 
  MOVE_TAB,
  UPDATE_AREA_POSITION,
  SET_TABS_CONTENT_RECT,
  SET_CLIENT_POINT_INFO,
  SET_TAB_LOCATION,
  SET_PRE_ADD_TAB,
  OPEN_HOVERING_MENU,
  CLOSE_HOVERING_MENU,
  SET_MOVE_TAB,
  INIT_TABS_POSITION_INFO,
  CHANGE_CURRENT_TAB,
  DELETE_TAB_LIST,
  SET_TOOLTIP,
  SET_ACTION_PAYLOAD,
  CLEAR_ACTION_PAYLOAD,
  OPEN_TARGET_TAB,
  CLEAR_OPENED_TABLOCATION
} from "./actions/type";
import { 
  TabsState, 
  TabsStateProps 
} from "./types";
import { 
  AddTabAction, 
  ClearStateItemAction, 
  DeleteTabAction, 
  InitTabListAction, 
  InitTabsPositionInfoAction, 
  MoveTabAction,
  UpdateAreaPositionAction,
  SetTabsContentRectAction,
  SetClientPointInfoAction,
  SetTabLocationAction,
  SetPreAddTabLocationAction,
  OpenHoveringAction,
  CloseHoveringAction,
  SetMoveTabAction,
  InitTabsAction,
  ChangeCurrentTabAction,
  DeleteTabListAction,
  SetTooltipAction,
  SetActionPayloadAction,
  ClearActionPayloadAction,
  OpenTargetTabAction,
  ClearOpenedTabLocationAction
} from "./actions";
import { 
  ActionHandlers, 
  createClearStatePart 
} from "./utils/reducerUtils";
import { TabArray } from "./stucts/tabArray";
import { Tab, TabLocation } from "./stucts/types";
import { getTabInList } from "./stucts/utils/getTab";
import { getTooltipMessage } from "./utils/getTooltipMessage";
import { HOVER, RESIZE, TOOLTIP } from "./constants";
import { getTabLocation } from "./stucts/utils/getLocation";
import { validationTabListBy3d } from "./stucts/utils/validationTab";
import { updateObject } from "../utils/objectUtils";

const clearedClientRectState: TabsStateProps = {
  clientX: 0,
  clientY: 0,
  adjustmentClientX: 0,
  adjustmentClientY: 0
}

const clearedTabLocation: TabsStateProps = {
  targetTabLocation: null,
  currentTabLocation: null,
  openedTabLocation: null
}

const clearedHoveringState: TabsStateProps = {
  hoveringMenuProps: null,
  hoveringType: null
}

function updateState(state: TabsState, props: TabsStateProps): TabsState {
  return updateObject(state, props);
}

function updateLocalState(state: TabsState, props: TabsStateProps) {
  const newState = updateState(state, props);

  if(
    state.isSaveLocalStorage
    && state.id
  ) {
    localStorage.setItem(state.id, JSON.stringify(newState));
  }

  return newState;
}

function clearStateItemHandler(
  state: TabsState,
  { payload }: ClearStateItemAction
) {
  return updateState(state, createClearStatePart<TabsStateProps>(initialTabsState, payload));
}

function initTabListHandler(
  state: TabsState,
  { 
    payload: {
      initTabList
    } 
  }: InitTabListAction
) {

  const {
    tabsContentRect
  } = state;

  const tabHorizonAreaList = new TabArray()
                                 .initHorizonAreaList(initTabList)
                                 .initAreaPositionInList(tabsContentRect);

  return updateLocalState(state, { tabHorizonAreaList });
}

function initTabsHandler(
  state: TabsState,
  { payload }: InitTabsAction
) {

  const {
    tabsContentRect,
    tabHorizonAreaList
  } = state;

  const {
    tabElementTable,
    defaultTabList,
    isSetAreaPostion
  } = payload;

  let newTabHorizonAreaList = tabHorizonAreaList;

  if(defaultTabList) {
    newTabHorizonAreaList = newTabHorizonAreaList.initHorizonAreaList(validationTabListBy3d(defaultTabList, tabElementTable));
  } else {
    newTabHorizonAreaList = newTabHorizonAreaList.validateTabArray(tabElementTable);
  }
                                
  if(isSetAreaPostion) {
    newTabHorizonAreaList = newTabHorizonAreaList.initAreaPositionInListFix(tabsContentRect);
  } else {
    newTabHorizonAreaList = newTabHorizonAreaList.initAreaPositionInList(tabsContentRect);
  }
    

  return updateLocalState(state, {
    ...payload,
    tabHorizonAreaList: newTabHorizonAreaList
  });
}

function initTabsPositionInfoHandler(
  state: TabsState,
  {
    payload: {
      tabsContentRect,
      positionValue = {
        x: 0,
        y: 0
      }
    }
  }: InitTabsPositionInfoAction
) {
  return updateLocalState(state, { tabsContentRect, positionValue }) ;
}

function setTabLocationHandler(
  state: TabsState,
  {
    payload: {
      targetTabLocation
    }
  }: SetTabLocationAction
) {
  return updateState(state, { targetTabLocation });
}

function setPreAddTabLocationHandler(
  state: TabsState,
  {
    payload: {
      targetTabLocation,
      clientPointInfo: {
        clientX,
        clientY
      }
    }
  }: SetPreAddTabLocationAction
) {

  const {
    positionValue: {
      x,
      y
    }
  } = state;

  return updateState(state, { 
    targetTabLocation,
    openedTabLocation: null,
    adjustmentClientX: clientX - x,
    adjustmentClientY: clientY - y,
    hoveringType: ADD_TAB
  })
}

function addTabHandler(
  state: TabsState,
  { 
    payload: {
      targetTab,
      targetTabLocation: newTargetTabLocation
    } 
  }: AddTabAction
) {

  const { 
    tabHorizonAreaList,
    targetTabLocation,
    tabsContentRect,
    tabElementTable
  } = state;

  let tabLocation: [number] | [number, number] | TabLocation | null | undefined;

  if(targetTabLocation) {
    tabLocation = targetTabLocation;
  }

  if(newTargetTabLocation) {
    tabLocation = newTargetTabLocation;
  }

  const targetTabList: Tab[] = Array.isArray(targetTab)? targetTab : [targetTab];

  const filteredTargetTabList = targetTabList.filter(tab => tabElementTable.hasOwnProperty(tab.type));

  if(!tabLocation || !filteredTargetTabList[0]) {
    return updateLocalState(state, {
      ...clearedClientRectState,
      ...clearedTabLocation,
      ...clearedHoveringState
    });
  }

  const newTabHorizonAreaList = tabHorizonAreaList
                                .addTabInList(tabLocation, filteredTargetTabList, tabsContentRect);

  return updateLocalState(state, { 
      tabHorizonAreaList: newTabHorizonAreaList,
      openedTabLocation: getTabLocation(tabLocation),
      ...clearedClientRectState,
      ...clearedTabLocation,
      ...clearedHoveringState
    });
}

function setTabsContentRectHandler(
  state: TabsState,
  {
    payload: {
      tabsContentRect
    }
  }: SetTabsContentRectAction
) {

  const {
    tabHorizonAreaList,
    tabsContentRect: preTabsContentRect,
  } = state;

  if(!preTabsContentRect.width || !preTabsContentRect.height) {

    const newTabHorizonAreaList = tabHorizonAreaList.initAreaPositionInList(tabsContentRect);

    return updateLocalState(state, {
      tabsContentRect,
      tabHorizonAreaList: newTabHorizonAreaList
    });
  }

  const newTabHorizonAreaList = tabHorizonAreaList
                                .resizeAreaPositionInList(preTabsContentRect, tabsContentRect);
 
  return updateLocalState(state, {
    tabsContentRect,
    tabHorizonAreaList: newTabHorizonAreaList
  });
}

function deleteTabHandler(
  state: TabsState,
  {
    payload: {
      targetTabLocation
    }
  }: DeleteTabAction
) {

  const { 
    tabHorizonAreaList
  } = state;

  const newTabHorizonAreaList = tabHorizonAreaList
                                .deleteTabInList(targetTabLocation);

  return updateLocalState(state, {
    tabHorizonAreaList: newTabHorizonAreaList,
    ...clearedTabLocation
  });
}

function deleteTabListHandler(
  state: TabsState,
  {
    payload: {
      targetTabLoction,
      typeList
    }
  }: DeleteTabListAction
) {

  const {
    tabHorizonAreaList
  } = state;

  const newTabHorizonAreaList = tabHorizonAreaList 
                                .deleteTabListInList(typeList, targetTabLoction);

  return updateLocalState(state, {
    tabHorizonAreaList: newTabHorizonAreaList,
    ...clearedTabLocation
  });
}

function setTooltipHandler(
  state: TabsState,
  {
    payload: {
      targetInfo,
      type,
      clientPointInfo: {
        clientX,
        clientY
      }
    }
  }: SetTooltipAction
) {

  const tooltipMessage = getTooltipMessage(state, type, targetInfo);

  if(!tooltipMessage) {
    return state;
  }

  const {
    positionValue: {
      x, 
      y
    }
  } = state;

  return updateState(state, {
    adjustmentClientX: clientX - x,
    adjustmentClientY: clientY - y,
    tooltipMessage,
    hoveringType: TOOLTIP,
    isPointerState: HOVER
  });
}

function setMoveTabHandler(
  state: TabsState,
  {
    payload: {
      clientPointInfo: {
        clientX,
        clientY
      },
      currentTabLocation
    }
  }: SetMoveTabAction
) {

  const {
    positionValue: {
      x,
      y
    }
  } = state;

  return updateState(state, {
    currentTabLocation,
    openedTabLocation: null,
    adjustmentClientX: clientX - x,
    adjustmentClientY: clientY - y,
    hoveringType: MOVE_TAB
  })
}

function moveTabHandler(
  state: TabsState,
  action: MoveTabAction
) {

  const { 
    tabHorizonAreaList,
    targetTabLocation,
    currentTabLocation,
    tabsContentRect
  } = state;

  if(!currentTabLocation || !targetTabLocation) {
    return updateState(state, {
      ...clearedClientRectState,
      ...clearedTabLocation,
      ...clearedHoveringState
    });
  } 

  if(targetTabLocation[0] === tabHorizonAreaList.length) {

    const targetTab = getTabInList(tabHorizonAreaList, currentTabLocation);

    if(!targetTab) {
      return state;
    }

    const newTabHorizonAreaList = tabHorizonAreaList
                                  .addTabInList(targetTabLocation, targetTab, tabsContentRect);           

    return updateLocalState(state, {
      tabHorizonAreaList: newTabHorizonAreaList,
      openedTabLocation: getTabLocation(targetTabLocation),
      ...clearedClientRectState,
      ...clearedTabLocation,
      ...clearedHoveringState
    });
  }

  if(targetTabLocation[1] === tabHorizonAreaList[targetTabLocation[0]].verticalAreaList.length) {

    const targetTab = getTabInList(tabHorizonAreaList, currentTabLocation);

    if(!targetTab) {
      return state;
    }

    const newTabHorizonAreaList = tabHorizonAreaList
                                  .addTabInList(targetTabLocation, targetTab, tabsContentRect);

    return updateLocalState(state, {
      tabHorizonAreaList: newTabHorizonAreaList,
      openedTabLocation: getTabLocation(targetTabLocation),
      ...clearedClientRectState,
      ...clearedTabLocation,
      ...clearedHoveringState
    });
  }

  const newTabHorizonAreaList = tabHorizonAreaList
                                .moveTabInList(
                                  currentTabLocation,
                                  targetTabLocation,
                                  tabsContentRect
                                );
                                 
  return updateLocalState(state, {
    tabHorizonAreaList: newTabHorizonAreaList,
    openedTabLocation: getTabLocation(targetTabLocation),
    ...clearedClientRectState,
    ...clearedTabLocation,
    ...clearedHoveringState
  });
}

function changeCurrentTabHandler(
  state: TabsState,
  {
    payload: {
      targetTabLocation,
      actionPayload
    }
  }: ChangeCurrentTabAction
) {

  const {
    tabHorizonAreaList
  } = state;

  const newTabHorizonAreaList = tabHorizonAreaList
                                .updateCurrentTabIndexInAreaList(targetTabLocation);

  return updateObject(state, {
    tabHorizonAreaList: newTabHorizonAreaList,
    openedTabLocation: targetTabLocation,
    actionPayload: actionPayload? actionPayload : state.actionPayload
  });
}

function openTargetTabHandler(
  state: TabsState,
  {
    payload: {
      targetTab,
      actionPayload = null,
      options
    }
  }: OpenTargetTabAction
) {

  const {
    tabHorizonAreaList,
    tabsContentRect
  } = state;

  const tabType = typeof targetTab === "string"
    ? targetTab 
    : targetTab.type;

  const result = tabHorizonAreaList.findTabLocationInList(tabType, options);

  if(!result) {
    return state;
  }

  const {
    findedTabLocation,
    matched
  } = result;

  let newTabHorizonAreaList = tabHorizonAreaList;

  if(matched) {
    newTabHorizonAreaList = tabHorizonAreaList.updateCurrentTabIndexInAreaList(findedTabLocation);
  } else {

    const tab = typeof targetTab === "object"
                ? targetTab
                : TabArray.createTab(targetTab);

    newTabHorizonAreaList = tabHorizonAreaList.addTabInList(findedTabLocation, tab, tabsContentRect);
  }

  return updateLocalState(state, {
    tabHorizonAreaList: newTabHorizonAreaList,
    actionPayload,
    openedTabLocation: findedTabLocation
  });
}

function setClientPointInfoHandler(
  state: TabsState,
  {
    payload: {
      clientPointInfoProps: {
        clientX,
        clientY
      },
      isPointerState
    }
  }: SetClientPointInfoAction
) {

  const {
    clientX: preClientX,
    clientY: preClientY,
    adjustmentClientX,
    adjustmentClientY,
    positionValue: {
      x,
      y
    },
    hoveringType
  } = state;

  return updateState(state, {
    clientX: clientX !== undefined? clientX : preClientX,
    clientY: clientY !== undefined? clientY : preClientY,
    adjustmentClientX: clientX !== undefined? clientX - x : adjustmentClientX,
    adjustmentClientY: clientY !== undefined? clientY - y : adjustmentClientY,
    isPointerState,
    hoveringType: isPointerState === RESIZE? RESIZE : hoveringType
  });
}

function updateAreaPositionHandler(
  state: TabsState,
  {
    payload: {
      targetAreaPosition,
      targetTabLocation
    }
  }: UpdateAreaPositionAction
) {

  const {
    tabHorizonAreaList,
    tabsContentRect
   } = state;

  const newTabHorizonAreaList = tabHorizonAreaList
                                .updateAreaPositionInList(
                                  targetTabLocation, 
                                  targetAreaPosition, 
                                  tabsContentRect
                                );

  return updateState(state, {
    tabHorizonAreaList: newTabHorizonAreaList
  });
}

function openHoveringMenuHandler(
  state: TabsState, 
  {
    payload: {
      hoveringType,
      hoveringMenuProps,
      clientPointInfo: {
        clientX,
        clientY
      }
    }
  }: OpenHoveringAction
) {

  const {
    positionValue: {
      x,
      y
    }
  } = state;

  return updateState(state, {
    hoveringType,
    hoveringMenuProps,
    adjustmentClientX: clientX - x,
    adjustmentClientY: clientY - y
  });
}

function closeHoveringMenuHandler(
  state: TabsState,
  action: CloseHoveringAction
) {
  return updateState(state, {
    ...clearedClientRectState,
    ...clearedHoveringState,
    currentTabLocation: null,
    targetTabLocation: null,
    isPointerState: null
  });
}

function setActionPayloadHandler(
  state: TabsState,
  {
    payload
  }: SetActionPayloadAction
) {
  return updateState(state, { actionPayload: payload });
}

function clearActionPayloadHandler(
  state: TabsState,
  action: ClearActionPayloadAction
) {
  return updateState(state, { 
    actionPayload: null,
    openedTabLocation: null
  });
}

function clearOpenedTabLocationHandler(
  state: TabsState,
  action: ClearOpenedTabLocationAction
) {
  return updateState(state, { 
    openedTabLocation: null
  });
}

const tabsHandlers: ActionHandlers<TabsState> = {
  [CLEAR_STATE_ITEM]        : clearStateItemHandler,
  [INIT_TABS]               : initTabsHandler,
  [INIT_TAB_LIST]           : initTabListHandler,
  [INIT_TABS_POSITION_INFO] : initTabsPositionInfoHandler,
  [SET_TABS_CONTENT_RECT]   : setTabsContentRectHandler,
  [SET_TAB_LOCATION]        : setTabLocationHandler,
  [SET_PRE_ADD_TAB]         : setPreAddTabLocationHandler,
  [ADD_TAB]                 : addTabHandler,
  [DELETE_TAB]              : deleteTabHandler,
  [DELETE_TAB_LIST]         : deleteTabListHandler,
  [SET_TOOLTIP]             : setTooltipHandler,
  [SET_MOVE_TAB]            : setMoveTabHandler,
  [MOVE_TAB]                : moveTabHandler,
  [CHANGE_CURRENT_TAB]      : changeCurrentTabHandler,
  [OPEN_TARGET_TAB]         : openTargetTabHandler,
  [SET_CLIENT_POINT_INFO]   : setClientPointInfoHandler,
  [UPDATE_AREA_POSITION]    : updateAreaPositionHandler,
  [OPEN_HOVERING_MENU]      : openHoveringMenuHandler,
  [CLOSE_HOVERING_MENU]     : closeHoveringMenuHandler,
  [SET_ACTION_PAYLOAD]      : setActionPayloadHandler,
  [CLEAR_ACTION_PAYLOAD]    : clearActionPayloadHandler,
  [CLEAR_OPENED_TABLOCATION]: clearOpenedTabLocationHandler
}

export default tabsHandlers;