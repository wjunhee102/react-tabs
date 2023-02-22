import React, { useMemo } from "react";
import { TabElementTable } from "../../..";
import { Tab } from "../../../store/stucts/types";
import DropDownCheckBoxButton from "../../drop-down-checkbox-button";

interface ListTabAddButtonProps {
  tab: Tab;
  tabElementTable: TabElementTable;
  addedTabInList: (targetTab: Tab) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListTabAddButton: React.FC<ListTabAddButtonProps> = ({
  tab,
  tabElementTable,
  addedTabInList
}) => {

  const {
    title,
    styleByLabel
  } = useMemo(() => {

    const tabElement = tabElementTable[tab.type];

    let title = tab.title? tab.title : tabElement.title;
    let color: string | undefined = tab.style && tab.style.color;
    
    if(!color) {
      color = tabElement.style && tabElement.style.color
    }
    
    return {
      title,
      styleByLabel: color? {
        color
      } : undefined
    }
  }, [tabElementTable, tab]);

  const addTabInList = useMemo(() => 
    addedTabInList(tab)
  , [addedTabInList, tab]); 

  return (
    <DropDownCheckBoxButton
      id={tab.type}
      styleByLabel={styleByLabel}
      onChange={addTabInList}
    >
      {title}
    </DropDownCheckBoxButton>
  );
}

export default ListTabAddButton;