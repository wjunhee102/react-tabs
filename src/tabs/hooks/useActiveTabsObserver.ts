import { useEffect } from "react";
import { TabElementProps } from "..";
import { HoveringTypes } from "../store/types";

export function setUseActiveTabsObserver(props: TabElementProps) {
  return function(callback: (hoveringType?: HoveringTypes | null) => void) {

    const {
      useTabsStoreHooks: {
        state: {
          hoveringType
        }
      }
    } = props;

    useEffect(() => {
      if(hoveringType) {
        callback(hoveringType);
      }
    // eslint-disable-next-line
    }, [hoveringType]);

  }
}

export function useActiveTabsObserver(callback: (hoveringType?: HoveringTypes | null) => void, props: TabElementProps) {
  setUseActiveTabsObserver(props)(callback);
}