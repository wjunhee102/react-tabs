import React, { useCallback } from "react";
import DropDownButton from "../../drop-down-button";
import Group from "../../group";
import { TabLocation } from "../../../store/stucts/types";
import { getTargetLocation } from "../../../store/stucts/utils/getLocation";

interface AreaSelectButtonProps {
  className: string;
  tabLocation: TabLocation | [number, number] | [number];
  addButtonTitle: string;
  moveButtonTitle: string;
  addTab: () => void;
  onMoveTab: () => void;
  onSetTabLocation: (targetTabLocation: [number] | [number, number] | TabLocation | null) => void;
}

const AreaSelectButton: React.FC<AreaSelectButtonProps> = ({
  className,
  tabLocation,
  addButtonTitle,
  moveButtonTitle,
  addTab,
  onMoveTab,
  onSetTabLocation,
}) => {

  const setTabLocation = useCallback(() => {

    const {
      targetTabHorizonAreaIdx,
      targetTabVerticalAreaIdx,
      targetTabIdx
    } = getTargetLocation(tabLocation);

    onSetTabLocation([ 
      targetTabHorizonAreaIdx, 
      targetTabVerticalAreaIdx? targetTabVerticalAreaIdx : 0,
      targetTabIdx? targetTabIdx : 0 
    ]);
  }, [onSetTabLocation, tabLocation]);

  return (
    <div onMouseEnter={setTabLocation}>
      <Group
        className={className}
        vertical
      >
        
        <DropDownButton onClick={addTab}>
          {addButtonTitle}
        </DropDownButton>

        <DropDownButton onClick={onMoveTab}>
          {moveButtonTitle}
        </DropDownButton>

      </Group>
    </div>
  )
}

export default AreaSelectButton;