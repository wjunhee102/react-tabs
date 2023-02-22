import classNames from "classnames";
import React from "react";
import TabButtonCover from "../TabButtonCover";
import TabSelectionArea from "../TabSelectionArea";

const TAB_BUTTON_HOVER = "hover:pr-5";

interface TabButtonViewProps {
  isActive: boolean;
  title: string;
  style?: React.CSSProperties;
  selected: boolean;
  isSelectActive: boolean;
  isActiveDeleteTabButton: boolean;
  changeCurrentTabIndex: (e: React.MouseEvent) => void;
  activeDrag: () => void;
  disableDrag: () => void;
  deleteTab: () => void;
  startMoveTab: (e: React.MouseEvent) => void;
  changeTargetTabLocation: () => void;
  resetTargetTabLocation: () => void;
  openAreaSelectMenu: (e: React.MouseEvent) => void;
  openTooltip: (e: React.MouseEvent) => void;
  closeTooltip: () => void;
}

const TabButtonView: React.FC<TabButtonViewProps> = ({
  isActive,
  title,
  style,
  selected,
  isSelectActive,
  isActiveDeleteTabButton,
  changeCurrentTabIndex,
  activeDrag,
  disableDrag,
  deleteTab,
  startMoveTab,
  changeTargetTabLocation,
  resetTargetTabLocation,
  openAreaSelectMenu,
  openTooltip,
  closeTooltip
}) => (
  <div 
    className={classNames(`relative w-auto h-auto pr-0 transition-all duration-75 group`, {
      [TAB_BUTTON_HOVER]: isActiveDeleteTabButton
    })}
    onContextMenu={openAreaSelectMenu}
  >
    
    <TabButtonCover
      isActive={isActive}
      onClick={changeCurrentTabIndex}
      onMouseDown={activeDrag}
      onMouseUp={disableDrag}
      onMouseMove={startMoveTab}
      onMouseEnter={openTooltip}
      onMouseLeave={closeTooltip}
      style={style}
    >
      {title}
    </TabButtonCover>

    {
      isActiveDeleteTabButton?
      <button 
        className="box-border absolute top-0 w-4 h-12 py-4 pl-1 opacity-0 group-hover:transition-all group-hover:delay-100 right-2 group-hover:opacity-100"
        onClick={deleteTab}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      : null
    }

    <TabSelectionArea 
      selected={selected}
      isActive={isSelectActive}
      changeTargetTabLocation={changeTargetTabLocation}
      resetTargetTabLocation={resetTargetTabLocation}
    />
  </div>
);

export default TabButtonView;