import { Tab } from "../types";

export function removeDuplicatesTabList(
  tabList: Tab[], 
  targetTabList: Tab[]
): [ Tab[], number ] {

  let tabIndex: number = -1;

  const filteredTargetTabList = targetTabList.filter((tab) => {

    const index = tabList.findIndex(({ type }) => type === tab.type);

    tabIndex = index;

    return index === -1;
  });


  return [ filteredTargetTabList, tabIndex ];
}