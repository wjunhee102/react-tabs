import tabsReducer, { initialTabsState } from "../store";
import { TabArray } from "../store/stucts/tabArray";
import { 
  useCallback, 
  useMemo, 
  useReducer
} from "react";
import {  
  TabsProps 
} from "..";
import { 
  addTab, 
  clearStateItem, 
  deleteTab, 
  initTabsPositionInfo, 
  moveTab, 
  sortAreaPosition,
  initTabList, 
  setClientPointInfo,  
  setTabLocation,
  setPreAddTabLocation,
  openHoveringMenu,
  setMoveTab,
  closeHoveringMenu,
  initTabs,
  setTabsContentRect,
  updateAreaPosition,
  changeCurrentTab,
  deleteTabList,
  setTooltip,
  setActionPayload,
  clearActionPayload,
  openTargetTab,
  clearOpenedTabLocation
} from "../store/actions";
import { 
  ChangeCurrentTabIndexInAreaListByTargetTabOptions,
  Tab, 
  TabLocation, 
  TabsContentRect 
} from "../store/stucts/types";
import { 
  ClientPointInfo, 
  ClientPointInfoProps, 
  HoveringTypes, 
  InitialValue, 
  IsPointerState, 
  SetTooltipProps, 
  TabsStateKey 
} from "../store/types";
import { MOVE_TAB, RESIZE } from "../store/constants";

export default function useTabsStore() {
  
  const [ state, dispatch ] = useReducer(tabsReducer, initialTabsState);

  const createTab = TabArray.createTab;

  const isMovingTab = useMemo(() => 
    state.hoveringType === MOVE_TAB || state.hoveringType === RESIZE
  , [state.hoveringType]);

  const onClearStateItem = useCallback((...key: TabsStateKey[]) => {
    dispatch(clearStateItem(...key));
  }, [dispatch]);

  const onInitTabs = useCallback((tabsProps: TabsProps) => {
    dispatch(initTabs(tabsProps));
  }, [dispatch]);

  const onInitTabList = useCallback((initialTabList: Tab[][][]) => {
    dispatch(initTabList(initialTabList));
  }, [dispatch]);

  const onSetTabsInfo = useCallback((targetTabsContentRect: TabsContentRect) => {
    dispatch(setTabsContentRect(targetTabsContentRect));
  }, [dispatch]);

  const onInitTabsPositionInfo = useCallback((initialValue: InitialValue) => {
    dispatch(initTabsPositionInfo(initialValue));
  }, [dispatch]);

  const onSetTabLocation = useCallback((targetTabLocation: [number] | [number, number] | TabLocation | null) => {
    dispatch(setTabLocation(targetTabLocation));
  }, [dispatch]);

  const onSetPreAddTabLocation = useCallback((
    targetTabLocation: TabLocation, 
    clientPointInfo: ClientPointInfo
  ) => {
    dispatch(setPreAddTabLocation(targetTabLocation, clientPointInfo));
  }, [dispatch]);

  const onAddTab = useCallback((
    targetTab: Tab | Tab[], 
    targetTabLocation?: [number] | [number, number] | TabLocation
  ) => {
    dispatch(addTab(targetTab, targetTabLocation));
  }, [dispatch]);

  const onDeleteTab = useCallback((targetTabLocation: TabLocation) => {
    dispatch(deleteTab(targetTabLocation));
  }, [dispatch]);

  const onDeleteTabList = useCallback((
    typeList: string[],
    targetTabLoction?: TabLocation | [ number, number ]
  ) => {
    dispatch(deleteTabList(typeList, targetTabLoction));
  }, [dispatch]);

  const onSetTooltip = useCallback((
    setTooltipProps: SetTooltipProps
  ) => {
    dispatch(setTooltip(setTooltipProps));
  }, [dispatch]);

  const onSetMoveTab = useCallback((
    currentTabLocation: TabLocation, 
    clientPointInfo: ClientPointInfo
  ) => {
    dispatch(setMoveTab(currentTabLocation, clientPointInfo));
  }, [dispatch]);

  const onMoveTab = useCallback(() => {
    dispatch(moveTab());
  }, [dispatch]);

  const onChangeCurrentTab = useCallback((
    targetTabLocation: TabLocation,
    actionPayload?: any
  ) => {
    dispatch(changeCurrentTab(targetTabLocation, actionPayload));
  }, [dispatch]);

  const onOpenTargetTab = useCallback((
    targetTab: string | Tab,
    props: {
      actionPayload?: any | null;
      options?: ChangeCurrentTabIndexInAreaListByTargetTabOptions;
    }
  ) => {
    dispatch(openTargetTab(targetTab, props));
  }, [dispatch]);

  const onSetClientPointInfo = useCallback((
    clientPointInfoProps: ClientPointInfoProps, 
    isPointerState: IsPointerState = null
  ) => {
    dispatch(setClientPointInfo(clientPointInfoProps, isPointerState));
  }, [dispatch]);

  const onUpdateAreaPosition = useCallback((
    targetTabLocation: [number] | [number, number], 
    targetAreaPosition: number
  ) => {
    dispatch(updateAreaPosition(targetTabLocation, targetAreaPosition));
  }, [dispatch]);

  const onSortAreaPosition = useCallback(() => {
    dispatch(sortAreaPosition());
  }, [dispatch]);

  const onOpenHoveringMenu = useCallback((
    hoveringType: HoveringTypes, 
    clientPointInfo: ClientPointInfo, 
    hoveringProps?: any
  ) => {
    dispatch(openHoveringMenu(hoveringType, clientPointInfo, hoveringProps));
  }, [dispatch]);

  const onCloseHoveringMenu = useCallback(() => {
    dispatch(closeHoveringMenu());
  }, [dispatch]);

  const onSetActionPayload = useCallback((actionPayload: any) => {
    dispatch(setActionPayload(actionPayload));
  }, [dispatch]);

  const onClearActionPayload = useCallback(() => {
    dispatch(clearActionPayload());
  }, [dispatch]);

  const onClearOpenedTabLocation = useCallback(() => {
    dispatch(clearOpenedTabLocation());
  }, [dispatch]);

  return {
    state,
    isMovingTab,
    createTab,
    onClearStateItem,
    onInitTabs,
    onInitTabList,
    onSetTabLocation,
    onSetPreAddTabLocation,
    onAddTab,
    onDeleteTab,
    onDeleteTabList,
    onSetTooltip,
    onSetMoveTab,
    onMoveTab,
    onChangeCurrentTab,
    onOpenTargetTab,
    onInitTabsPositionInfo,
    onSetTabsInfo,
    onSetClientPointInfo,
    onUpdateAreaPosition,
    onSortAreaPosition,
    onOpenHoveringMenu,
    onCloseHoveringMenu,
    onSetActionPayload,
    onClearActionPayload,
    onClearOpenedTabLocation
  }
}

export type UseTabsStoreType = ReturnType<typeof useTabsStore>;