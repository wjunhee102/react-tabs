import React from "react";
import classNames from "classnames";

const IS_ACTIVE = "!font-semibold text-darkGray-20";
const NOT_ACTIVE = "text-darkGray-10 !hover:font-semibold hover:text-darkGray-20"

interface TabButtonCoverProps {
  isActive?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onContextMenu?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseMove?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

const TabButtonCover: React.FC<TabButtonCoverProps> = ({
  isActive = false,
  style,
  onClick,
  onContextMenu,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseOver,
  onMouseEnter,
  onMouseLeave,
  children
}) => {
  return (
    <button
      className={classNames(
        "px-2 w-max min-w-[80px] font-normal text-md leading-[47px] h-[47px] block relative",
        {
          [IS_ACTIVE]: isActive,
          [NOT_ACTIVE]: !isActive
        }
      )}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseOver={onMouseOver}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      {children}
    </button>
  );
}  

export default TabButtonCover;