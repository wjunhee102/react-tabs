import React, { 
  useCallback, 
  useEffect, 
  useRef
} from "react";
import { TabsProps } from ".";
import { useResizeObserver } from "./hooks/useResizeObserver";
import { UseTabsStoreType } from "./hooks/useTabsStore";
import TabsView from "./TabsView";

interface Props extends TabsProps {
  useTabsStoreHooks: UseTabsStoreType;
}

const Tabs: React.FC<Props> = (tabProps) => {
  
  const tabsRef = useRef<HTMLDivElement>(null);

  const useTabsStoreHooks = tabProps.useTabsStoreHooks;

  const {
    state: {
      hoveringType
    },
    onInitTabs,
    onInitTabsPositionInfo,
    onSetTabsInfo,
    onMoveTab,
    onSetClientPointInfo
  } = useTabsStoreHooks;

  const setTabsContentRect = useCallback((contentRect: DOMRectReadOnly) => {
    onSetTabsInfo({ width: contentRect.width, height: contentRect.height });
  }, [onSetTabsInfo]);

  const moveTabButton = useCallback((e: React.MouseEvent) => {
    if(hoveringType !== "MOVE_TAB") return;

    onSetClientPointInfo({
      clientX: e.clientX,
      clientY: e.clientY
    });

  }, [hoveringType, onSetClientPointInfo]);

  const moveTab = useCallback(() => {
    if(hoveringType === "MOVE_TAB") {
      onMoveTab();
    }
  }, [onMoveTab, hoveringType]);

  useResizeObserver(tabsRef, setTabsContentRect);

  const correctPosition = useCallback(() => {
    if(!tabsRef.current) return;

    const tabsContentRect = {
      width: tabsRef.current.clientWidth,
      height: tabsRef.current.clientHeight
    }

    const clientRect = tabsRef.current.getBoundingClientRect();
 
    const positionValue = {
      x: clientRect.x,
      y: clientRect.y
    }

    onInitTabsPositionInfo({ tabsContentRect, positionValue });
  }, [tabsRef, onInitTabsPositionInfo]);

  useEffect(correctPosition, [correctPosition]);

  useEffect(() => {
    onInitTabs(tabProps);
  // 고정 요소
  // eslint-disable-next-line
  }, []);

  const props = {
    ref: tabsRef,
    useTabsStoreHooks,
    moveTab,
    moveTabButton,
    correctPosition
  }

  return <TabsView {...props} />;
}

export default Tabs;