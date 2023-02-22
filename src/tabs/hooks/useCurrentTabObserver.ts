import { useEffect, useState } from "react";
import { TabElementProps } from "..";

export function setUseCurrentTabObserver(
  {
    useTabsStoreHooks,
    tabLocation
  }: TabElementProps
) {
  return function(callback: (actionPayload?: any | null) => void) {

    const [ isCurrent, setIsCurrent ] = useState(false);

    const {
      state: {
        tabHorizonAreaList,
        actionPayload
      }
    } = useTabsStoreHooks;

    useEffect(() => {
      
      if(!tabHorizonAreaList[tabLocation[0]]) {

        if(isCurrent) {
          setIsCurrent(false);
        }

        return;
      }

      const verticalArea = tabHorizonAreaList[tabLocation[0]]
                           .verticalAreaList[tabLocation[1]];
      
      if(!verticalArea) {

        if(isCurrent) {
          setIsCurrent(false);
        }

        return;
      }

      if(
        !isCurrent
        && verticalArea.currentTabIndex === tabLocation[2]
      ) {
        callback(actionPayload);
        setIsCurrent(true);
      } else if(
        isCurrent
        && verticalArea.currentTabIndex !== tabLocation[2]
      ) {
        setIsCurrent(false);
      }
    // eslint-disable-next-line
    }, [tabHorizonAreaList]);

  }
}

export function useCurrentTabObserver(
  callback: (actionPayload?: any | null) => void,
  props: TabElementProps
) {
  setUseCurrentTabObserver(props)(callback);
}