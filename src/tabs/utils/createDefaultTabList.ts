import { Tab } from "../store/stucts/types";
import { createTab } from "../store/stucts/utils/create";

function createTabList(tabTitleList: string[]): Tab[] {
  return tabTitleList.map(title => createTab(title));
}

export function createDefaultTabList(
  tabTitleList: string[] | string[][] | string[][][]
): Tab[][][] {

  const defaultTabList: Tab[][][] = [[[]]];

  tabTitleList.forEach((firstDepth, firstDepthIndex) => {

    if(typeof firstDepth === "string") {

      const tab = createTab(firstDepth);

      defaultTabList[0][0].push(tab);

      return;
    }

    if(!defaultTabList[firstDepthIndex]) {
      defaultTabList.push([[]]);
    }

    firstDepth.forEach((secondDepth, secondDepthIndex) => {

      if(typeof secondDepth === "string") {

        const tab = createTab(secondDepth);

        defaultTabList[firstDepthIndex][0].push(tab);

        return;
      }

      if(!defaultTabList[secondDepthIndex]) {
        defaultTabList.push([]);
      }

      const tabList = createTabList(secondDepth);

      defaultTabList[firstDepthIndex][secondDepthIndex] = tabList;

      return;
    })

  });

  return defaultTabList.filter(horizonArea => horizonArea[0][0]);
}