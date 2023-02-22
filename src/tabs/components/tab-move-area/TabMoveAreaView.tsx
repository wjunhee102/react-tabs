import React from "react";
import { TabStyle } from "../../store/stucts/types";
import TabButtonCover from "../TabButtonCover";

interface TabMoveAreaViewProps {
  moveTabButtonPosition: React.CSSProperties;
  title: string;
  style?: TabStyle;
}

const TabMoveAreaView: React.FC<TabMoveAreaViewProps> = ({
  moveTabButtonPosition,
  title,
  style
}) => (
  <div className="absolute top-0 left-0 z-0 w-full h-full">
    <div
      className="absolute top-0 left-0 z-50 bg-white opacity-60 cursor-grab" 
      style={moveTabButtonPosition}
    >
      <TabButtonCover 
        isActive={true}
        style={style}
      >
        {title}
      </TabButtonCover>
    </div>
  </div>
);

export default TabMoveAreaView;