import React, { 
  useCallback, 
  useState, 
  useRef 
} from "react";
import { UseTabsStoreType } from "../../hooks/useTabsStore";
import { useTooltip } from "../../hooks/useTooltip";
import { TOOLTIP, TOOLTIP_ACTION_TYPE_BY_RESIZE_BAR, TOOLTIP_TYPE_BY_HORIZON } from "../../store/constants";
import HorizonResizeAreaView from "./HorizonResizeAreaView";

const MIN_WIDTH = 50;

interface HorizonResizeAreaProps {
  useTabsStoreHooks: UseTabsStoreType;
}

const HorizonResizeArea: React.FC<HorizonResizeAreaProps> = ({ useTabsStoreHooks }) => {

  const [ currentResizingArea, setResizingArea ] = useState<number>(0);

  const currentPosition = useRef<number>(0);

  const {
    state: {
      tabHorizonAreaList,
      tabsContentRect: {
        width
      },
      clientX,
      isPointerState,
      hoveringType
    }, 
    onSetClientPointInfo,
    onUpdateAreaPosition
  } = useTabsStoreHooks;

  const {
    openTooltip,
    closeTooltip
  } = useTooltip(useTabsStoreHooks, TOOLTIP_ACTION_TYPE_BY_RESIZE_BAR, TOOLTIP_TYPE_BY_HORIZON);

  const resizeHorizonPosition = useCallback((areaPositionLocation: number) => (e: React.MouseEvent) => {
    if(clientX === 0 || isPointerState !== "resize") return;

    const previousAreaPosition = areaPositionLocation? tabHorizonAreaList[areaPositionLocation - 1].areaPosition : 0;
    const nextAreaPosition = areaPositionLocation + 1 === tabHorizonAreaList.length? width : tabHorizonAreaList[areaPositionLocation + 1].areaPosition;

    const position = currentPosition.current + e.clientX - clientX;  

    if(position - previousAreaPosition < MIN_WIDTH || nextAreaPosition - position < MIN_WIDTH) {
      return;
    }

    onUpdateAreaPosition([ areaPositionLocation ], position);
  }, [onUpdateAreaPosition, tabHorizonAreaList, currentPosition, clientX, width, isPointerState]);

  const endResizeHorizonPosition = useCallback(() => { 
    onSetClientPointInfo({ clientX: 0 });
    setResizingArea(0);

    if(hoveringType === TOOLTIP) {
      closeTooltip();
    }

  }, [onSetClientPointInfo, closeTooltip, hoveringType]);

  const startResizeHorizonPosition = useCallback((areaPositionLocation: number, areaPosition: number) => (e: React.MouseEvent) => {
    onSetClientPointInfo({ clientX: e.clientX }, "resize");
    setResizingArea(areaPositionLocation);
    currentPosition.current = areaPosition;
  }, [onSetClientPointInfo, currentPosition]);

  const props = {
    tabHorizonAreaList,
    currentResizingArea,
    resizeHorizonPosition,
    endResizeHorizonPosition,
    startResizeHorizonPosition,
    openTooltip
  }

  return <HorizonResizeAreaView {...props} />;
}

export default HorizonResizeArea;