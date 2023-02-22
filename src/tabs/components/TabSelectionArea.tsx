import classNames from "classnames";
import React from "react";

const SELECTED = "bg-opacity-10";
const NOT_SELECTED = "bg-opacity-0";
const IS_COVE_ACTIVE = "z-20";
const DEFAULT = "w-full h-full left-0 top-0";
const IS_ACTIVE = "pointer-events-auto";

interface TabSelectionAreaProps {
  style?: React.CSSProperties;
  selected: boolean,
  isActive: boolean,
  changeTargetTabLocation: () => void;
  resetTargetTabLocation: () => void;
}

const TabSelectionArea: React.FC<TabSelectionAreaProps> = ({
  style,
  selected,
  isActive,
  changeTargetTabLocation,
  resetTargetTabLocation,
}) => {
  return (
    <div 
      className={classNames(
        "absolute bg-darkGray-20 pointer-events-none",
        {
          [NOT_SELECTED]  : !selected,
          [SELECTED]      : selected,
          [IS_COVE_ACTIVE]: isActive,
          [DEFAULT]       : !style
        }
      )}
      style={style}
    >
      <div 
        className={classNames(
          "w-full h-full bg-transparent", 
          { [IS_ACTIVE]: isActive }
        )}
        onMouseEnter={changeTargetTabLocation}
        onMouseLeave={resetTargetTabLocation}
      >
      </div>
    </div>
  );
}

export default TabSelectionArea;