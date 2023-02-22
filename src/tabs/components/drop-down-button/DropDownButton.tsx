import React from "react";

interface DropDownButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode | string;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({
  className = "",
  style,
  onClick,
  onMouseOver,
  onMouseLeave,
  children
}) => (
  <button
    type="button"
    className={`box-border h-8 px-2 font-normal leading-8 text-left w-full min-w-[96px] rounded text-md text-darkGray-20 hover:bg-lightBlue hover:text-black ${className}`}
    style={style}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </button>
);

export default DropDownButton;