import React from "react";
import { TabElementTable } from "../../..";
import { Tab } from "../../../store/stucts/types";
import Group from "../../group";
import OneTabAddButton from "./OneTabAddButton";

interface OneTabAddMenuProps {
  tabList: Tab[];
  tabElementTable: TabElementTable;
  onAddTab: (targetTab: Tab | Tab[]) => void;
}

const OneTabAddMenu: React.FC<OneTabAddMenuProps> = ({
  tabList,
  tabElementTable,
  onAddTab
}) => {
  return (
    <Group
      className="p-2" 
      vertical
      flexGap="flex-gap-none"
    >
      {
        tabList.map((tab) => 
          <OneTabAddButton 
            key={tab.type}
            tab={tab}
            tabElementTable={tabElementTable}
            onAddTab={onAddTab} 
          />
        )
      }
    </Group>
  );
}

export default OneTabAddMenu;