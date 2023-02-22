import React, { useCallback, useState } from "react";
import { TabElementTable } from "../../..";
import { Tab } from "../../../store/stucts/types";
import DropDownMenuButton from "../../drop-down-menu-button";
import Group from "../../group";
import ListTabAddButton from "./ListTabAddButton";

interface ListTabAddMenuProps {
  tabList: Tab[];
  tabElementTable: TabElementTable;
  onAddTab: (targetTab: Tab | Tab[]) => void;
}

const ListTabAddMenu: React.FC<ListTabAddMenuProps> = ({
  tabList,
  tabElementTable,
  onAddTab
}) => {

  const [ addedTabList, setTabList ] = useState<Tab[]>([]);

  const addedTabInList = useCallback((targetTab: Tab) => (e: React.ChangeEvent<HTMLInputElement>) => {

    if(e.target.checked) {
      setTabList([...addedTabList, targetTab]);
    } else {
      setTabList(addedTabList.filter(tab => tab.type !== targetTab.type));
    }

  }, [setTabList, addedTabList]);

  const addTabListInList = useCallback(() => {
    onAddTab(addedTabList);
  }, [addedTabList, onAddTab]);

  return (
    <React.Fragment>
      <Group
        className="px-2 pt-4 pb-3"
        vertical
      >
        {
          tabList.map(tab => 
            <ListTabAddButton
              key={tab.type} 
              tab={tab}
              tabElementTable={tabElementTable}
              addedTabInList={addedTabInList}
            />
          )
        }
      </Group>

      <DropDownMenuButton
        onClick={addTabListInList}
      >
        <span className="text-main">확인</span>
      </DropDownMenuButton>
    </React.Fragment>
  );
}

export default ListTabAddMenu;