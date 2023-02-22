import React from "react";
import Group from "../group";
import classNames from "classnames";

const CLOSE = "opacity-0 pointer-events-none";
const OPEN  = "opacity-100 pointer-events-auto"; 

interface MenuProps {
  minWidth?: string;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  },
  show: boolean;
  className?: string;
  fixed?: boolean;
  children?: React.ReactNode | string;
}

const Menu: React.FC<MenuProps> = ({
  className = "",
  minWidth = "96px",
  position = {
    top: 0,
    left: 0
  },
  show,
  fixed,
  children
}) => {
  return (
    <div 
      className={`${fixed ? "fixed" : "absolute"} z-10 w-auto h-auto px-4 pointer-events-none`}
      style={position}
    >
      <Group 
        className={classNames(
          `relative w-fit border border-lightGray-30 border-solid rounded shadow-md hovering-menu overflow-hidden transition-opacity duration-200 ${className}`,
          {
            [CLOSE]: !show,
            [OPEN]: show  
          }
        )}
        vertical
        flexGap="flex-gap-none"
        style={{
          minWidth
        }}
      >
        {children}
      </Group>
    </div>
  );
}

export default Menu;