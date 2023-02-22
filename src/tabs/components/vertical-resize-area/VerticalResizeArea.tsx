import React, { 
  useCallback, 
  useState, 
  useRef, 
  useMemo
} from "react";
import { UseTabsStoreType } from "../../hooks/useTabsStore";
import { useTooltip } from "../../hooks/useTooltip";
import { TOOLTIP, TOOLTIP_ACTION_TYPE_BY_RESIZE_BAR, TOOLTIP_TYPE_BY_VERTICAL } from "../../store/constants";
import { TabVeticalArea } from "../../store/stucts/types";
import VerticalResizeAreaView from "./VerticalResizeAreaView";

const MIN_HEIGHT = 90;

interface VerticalResizeAreaProps {
  useTabsStoreHooks: UseTabsStoreType;
  horizonAreaStyle: { width: string };
  areaPosition: number;
  verticalAreaList: TabVeticalArea[];
  horizonAreaIndex: number;
}

const VerticalResizeArea: React.FC<VerticalResizeAreaProps> = ({ 
  useTabsStoreHooks,
  horizonAreaStyle,
  areaPosition,
  verticalAreaList,
  horizonAreaIndex
}) => {

  const [ currentResizingArea, setResizingArea ] = useState<number>(0);

  const currentPosition = useRef<number>(0);

  const {
    state: {
      tabsContentRect: {
        height
      },
      clientY,
      isPointerState,
      hoveringType
    }, 
    onSetClientPointInfo,
    onUpdateAreaPosition
  } = useTabsStoreHooks;

  const {
    openTooltip,
    closeTooltip
  } = useTooltip(useTabsStoreHooks, TOOLTIP_ACTION_TYPE_BY_RESIZE_BAR, TOOLTIP_TYPE_BY_VERTICAL);

  const verticalResizeAreaStyle = useMemo(() => ({
    ...horizonAreaStyle,
    transform: `translateX(${areaPosition}px)`
  }), [horizonAreaStyle, areaPosition]);

  const resizeVerticalPosition = useCallback((areaPositionLocation: number) => (e: React.MouseEvent) => {
    if(clientY === 0 || isPointerState !== "resize") return;

    const previousAreaPosition = areaPositionLocation? verticalAreaList[areaPositionLocation - 1].areaPosition : 0;
    const nextAreaPosition = areaPositionLocation + 1 === verticalAreaList.length? height : verticalAreaList[areaPositionLocation + 1].areaPosition;

    const position = currentPosition.current + e.clientY - clientY;  

    if(position - previousAreaPosition < MIN_HEIGHT || nextAreaPosition - position < MIN_HEIGHT) {
      return;
    }

    onUpdateAreaPosition([horizonAreaIndex, areaPositionLocation], position);
  }, [onUpdateAreaPosition, horizonAreaIndex, verticalAreaList, currentPosition, clientY, height, isPointerState]);

  const endResizeVerticalPosition = useCallback(() => { 
    onSetClientPointInfo({ clientY: 0 });
    setResizingArea(0);

    if(hoveringType === TOOLTIP) {
      closeTooltip();
    }

  }, [onSetClientPointInfo, closeTooltip, hoveringType]);

  const startResizeVerticalPosition = useCallback((areaPositionLocation: number, areaPosition: number) => (e: React.MouseEvent) => {
    onSetClientPointInfo({ clientY: e.clientY }, "resize");
    setResizingArea(areaPositionLocation);

    currentPosition.current = areaPosition;
  }, [onSetClientPointInfo, currentPosition]);

  const props = {
    verticalResizeAreaStyle,
    verticalAreaList,
    currentResizingArea,
    startResizeVerticalPosition,
    resizeVerticalPosition,
    endResizeVerticalPosition,
    openTooltip
  }

  return <VerticalResizeAreaView {...props} />;
}

export default VerticalResizeArea;