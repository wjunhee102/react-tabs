import { useMemo } from "react";
import { TabElementProps } from "..";
import { setUseActiveTabsObserver } from "./useActiveTabsObserver";
import { setUseCurrentTabObserver } from "./useCurrentTabObserver";
import { setUseOpenedTabObserver } from "./useOpenedTabObserver";
import { useOpenTargetTab } from "./useOpenTargetTab";

export function useTabs(props: TabElementProps) {

  const useCurrentTabObserver = useMemo(() => setUseCurrentTabObserver(props), [props]);
  const useOpenedTabObserver  = useMemo(() => setUseOpenedTabObserver(props), [props]);
  const useActiveTabsObserver = useMemo(() => setUseActiveTabsObserver(props), [props]);

  const openTargetTab = useOpenTargetTab(props);

  return {
    ...props,
    useCurrentTabObserver,
    useOpenedTabObserver,
    useActiveTabsObserver,
    openTargetTab
  }
}