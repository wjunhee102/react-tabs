import React from "react";
import Menu from "../menu";
import { TabLocation } from "../../store/stucts/types";
import AreaSelectButton from "./components/AreaSelectButton";
import DropDownMenuButton from "../drop-down-menu-button";

interface TabAreaSelectMenuViewProps {
  position: {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
  };
  show: boolean;
  locationList: [[number], [number], [number, number]];
  onCloseHoveringMenu: () => void;
  addTab: () => void;
  onMoveTab: () => void;
  onSetTabLocation: (targetTabLocation: [number] | [number, number] | TabLocation | null) => void;
  freeTabLocation: () => void;
}

const TabAreaSelectMenuView: React.FC<TabAreaSelectMenuViewProps> = ({
  position,
  show,
  locationList,
  onCloseHoveringMenu,
  addTab,
  onMoveTab,
  onSetTabLocation,
  freeTabLocation
}) => (
  <Menu
    className="bg-white"
    position={position}
    show={show}
  >
    <div 
      className="p-2"
      onMouseLeave={freeTabLocation}
    >

      <AreaSelectButton 
        className="pb-2 border-b border-solid border-lightGray-10"
        tabLocation={locationList[0]}
        onSetTabLocation={onSetTabLocation}
        onMoveTab={onMoveTab}
        addTab={addTab}
        addButtonTitle="우측 패널에서 열기"
        moveButtonTitle="우측으로 이동"
      />

      <AreaSelectButton 
        className="py-2 border-b border-solid border-lightGray-10"
        tabLocation={locationList[1]}
        onSetTabLocation={onSetTabLocation}
        onMoveTab={onMoveTab}
        addTab={addTab}
        addButtonTitle="좌측 패널에서 열기"
        moveButtonTitle="좌측으로 이동"
      />

      <AreaSelectButton 
        className="pt-2"
        tabLocation={locationList[2]}
        onSetTabLocation={onSetTabLocation}
        onMoveTab={onMoveTab}
        addTab={addTab}
        addButtonTitle="하단 패널에서 열기"
        moveButtonTitle="하단으로 이동"
      />

    </div>

    <DropDownMenuButton
      onClick={onCloseHoveringMenu}
    >
      <span className=" text-darkGray-10">탭 닫기</span>
    </DropDownMenuButton>
  </Menu>
);

export default TabAreaSelectMenuView;