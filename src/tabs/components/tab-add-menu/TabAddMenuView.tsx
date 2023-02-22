import React from "react";
import { TabElementTable } from "../..";
import { Tab } from "../../store/stucts/types";
import Menu from "../menu";
import ListTabAddMenu from "./components/ListTabAddMenu";
import OneTabAddMenu from "./components/OneTabAddMenu";

interface TabAddMenuViewProps {
  position: {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
  };
  show: boolean;
  tabList: Tab[];
  isList: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  tabElementTable: TabElementTable;
  onAddTab:(targetTab: Tab | Tab[]) => void;
}

const TabAddMenuView: React.FC<TabAddMenuViewProps> = ({
  position,
  show,
  tabList,
  tabElementTable,
  isList,
  menuRef,
  onAddTab
}) => {
  return (
    <Menu
      className="bg-white"
      position={position}
      show={show}
    >
      <div ref={menuRef}>
        {
          isList? 
            <ListTabAddMenu 
              tabList={tabList}
              tabElementTable={tabElementTable}
              onAddTab={onAddTab}
            />
          : <OneTabAddMenu 
              tabList={tabList}
              tabElementTable={tabElementTable}
              onAddTab={onAddTab}
            />
        }
      </div>
    </Menu>
  );
}

export default TabAddMenuView;