import React from "react";

interface DropDownMenuButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode | string;
}

const DropDownMenuButton: React.FC<DropDownMenuButtonProps> = ({
  onClick,
  children
}) => (
  <button
    className="w-full leading-[38px] h-[39px] text-center text-md font-bold box-border border-t border-solid border-lightGray-20"
    onClick={onClick}
  >
    {children}
  </button>
);

export default DropDownMenuButton;