import React from "react";
import classNames from "classnames";
import "./Group.scss";
import { FlexOptions } from "../index.type";

interface GroupProps extends FlexOptions {
  className?: string;
  style?: React.CSSProperties;
  hidden?: boolean;
  vertical?: boolean;
  widthFill?: boolean;
  heightFill?: boolean;
  childrenFill?: boolean;
  children?: React.ReactNode;
}

const Group: React.FC<GroupProps> = ({
  className = "",
  style,
  hidden = false,
  vertical = false,
  widthFill = false,
  heightFill = false,
  childrenFill = false,
  justifyContent = "justify-start",
  justifyItems = "justify-items-center",
  justifySelf = "justify-self-auto",
  alignContents = "content-center",
  alignItems = "items-center",
  flexGap = "flex-gap",
  children
}) => {
  return (
    <div 
      className={classNames(
        `tana-group ${justifyContent} ${justifyItems} ${justifySelf} ${alignContents} ${alignItems} ${flexGap} ${className}`,
        {
          hidden,
          vertical,
          widthFill,
          heightFill,
          childrenFill
        } 
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export default Group;