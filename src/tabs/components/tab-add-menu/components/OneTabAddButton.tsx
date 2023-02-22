import React, { useCallback, useMemo } from "react";
import DropDownButton from "../../drop-down-button";
import { TabElementTable } from "../../..";
import { Tab } from "../../../store/stucts/types";

interface OneAddTabButtonProps {
  tab: Tab;
  tabElementTable: TabElementTable;
  onAddTab:(targetTab: Tab | Tab[]) => void;
}

const OneAddTabButton: React.FC<OneAddTabButtonProps> = ({
  tab,
  tabElementTable,
  onAddTab
}) => {

  const {
    title,
    style
  } = useMemo(() => {

    const tabElement = tabElementTable[tab.type];

    let title = tab.title? tab.title : tabElement.title;
    let color: string | undefined = tab.style && tab.style.color;
    
    if(!color) {
      color = tabElement.style && tabElement.style.color
    }
    
    return {
      title,
      style: color? {
        color
      } : undefined
    }
  }, [tabElementTable, tab]);

  const addTabInList = useCallback(() => {
    onAddTab(tab);
  }, [tab, onAddTab]);

  return (
    <DropDownButton 
      onClick={addTabInList}
      style={style}
    >
      {title}
    </DropDownButton>
  );
}

export default OneAddTabButton;