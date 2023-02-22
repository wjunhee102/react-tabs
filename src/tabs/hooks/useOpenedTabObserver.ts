import { useEffect } from "react";
import { TabElementProps } from "..";

export function setUseOpenedTabObserver(
  {
    useTabsStoreHooks,
    tabLocation
  }: TabElementProps
) {
  return function(callback: (actionPayload?: any | null) => void) {

    const {
      state: {
        openedTabLocation,
        actionPayload
      },
      onClearOpenedTabLocation
    } = useTabsStoreHooks;

    useEffect(() => {

      if(
        openedTabLocation
        && tabLocation[0] === openedTabLocation[0]
        && tabLocation[1] === openedTabLocation[1]
        && tabLocation[2] === openedTabLocation[2]
      ) {
        callback(actionPayload);
        onClearOpenedTabLocation();
      }
      
    // eslint-disable-next-line
    }, [openedTabLocation]);

  }
}

export function useOpenedTabObserver(
  callback: (actionPayload?: any | null) => void,
  props: TabElementProps
) {
  setUseOpenedTabObserver(props)(callback);
}