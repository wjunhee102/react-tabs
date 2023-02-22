import React, { useCallback, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Tabs, { TabElementProps, TabsProps, useTabsStore } from "./tabs";
import { TabArray } from "./tabs/store/stucts/tabArray";
import { useCurrentTabObserver } from "./tabs/hooks/useCurrentTabObserver";
import { useActiveTabsObserver } from "./tabs/hooks/useActiveTabsObserver";
import { useTabs } from "./tabs/hooks/useTabs";
import { TabLocation } from "./tabs/store/stucts/types";
import { findTabLocationInList, WhereToLookTypes } from "./tabs/store/stucts/utils/findTabLocationInList";
import { UseTabsStoreType } from "./tabs/hooks/useTabsStore";
import { useOpenTargetTab } from "./tabs/hooks/useOpenTargetTab";

export default {
  title: "organisms/Tabs",
  component: Tabs,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Tabs>;

const aTab = TabArray.createTab("aTab");
const bTab   = TabArray.createTab("bTab");
const cTab = TabArray.createTab("cTab");

const defaultTabList = [
  [ 
    [
      aTab,
      bTab
    ]
  ],
  [ 
    [
      aTab,
      bTab
    ],
    [
      aTab,
      bTab
    ]
  ],
  [
    [
      cTab
    ]
  ]
]

const defaultTabList2 = [
  [[], []],
  [ 
    [
      aTab,
      bTab
    ]
  ],
  [[]]
];

const leftUtilsElement = (props: TabElementProps) => (
  <div className="flex items-center justify-center w-fit">
    
    <div className="box-content w-5 h-5 px-2 border-r border-solid border-lightGray-30">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="3" width="2" height="14" fill="black"/>
        <rect x="10" y="8" width="5" height="4" fill="black"/>
      </svg>
    </div>

    <div className="h-5 px-2 py-[2px]">
      <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0.5H2V15.5H0V0.5Z" fill="#838383"/>
        <path d="M10.3333 8.83317V11.3332L7 7.99984L10.3333 4.6665V7.1665H12.8333V8.83317H10.3333Z" fill="#838383"/>
        <path d="M5.5 0.5H3.5V15.5H5.5V0.5Z" fill="#838383"/>
      </svg>
    </div>

  </div>
)

const rightUtilsElement = (props: TabElementProps) => (
  <div className="flex py-2 text-md">
    <div className="px-3 leading-8">
      초기화
    </div>
    <div className="w-[69] px-2 leading-8 rounded bg-main text-white">
      변경 적용
    </div>
  </div>
)

const AComponent: React.FC<TabElementProps> = (props) => {

  const {
    tabLocation
  } = props;

  const {
    useCurrentTabObserver,
    useActiveTabsObserver,
    openTargetTab
  } = useTabs(props);

  useCurrentTabObserver((actionPayload: any | null) => {
    console.log("aTab current");
  });

  useActiveTabsObserver((hoveringTypes: any) => {
    // console.log(hoveringTypes, "움직이는 중...");
  });

  // const aa = useOpenTargetTab({ useTabsStoreHooks, tabLocation });

  const setOpenTargetTab = (whereToLook: WhereToLookTypes) => () => {
    openTargetTab("bTab", 
      {
        actionPayload: "black",
        whereToLook,
        findATab: false,
        createATab: true
      }
    ) 
  }

  return (
    <div className="w-full h-full bg-lime-50 hover:bg-lime-300">
      A Tab {tabLocation.join("-")}
      <div>
        <button className="block border border-gray-600 border-solid bg-main" onClick={setOpenTargetTab("CURRENT")}>현재 위치</button>
        <button className="block border border-gray-600 border-solid bg-main" onClick={setOpenTargetTab("LEFT")}>왼쪽</button>
        <button className="block border border-gray-600 border-solid bg-main" onClick={setOpenTargetTab("RIGHT")}>오른쪽</button>
        <button className="block border border-gray-600 border-solid bg-main" onClick={setOpenTargetTab("UP")}>위</button>
        <button className="block border border-gray-600 border-solid bg-main" onClick={setOpenTargetTab("DOWN")}>아래</button>
      </div>
    </div>
  );
} 


const BComponent = (props: TabElementProps) => {

  const [ color, setColor ] = useState<string>("");

  const {
    tabLocation,
    useTabsStoreHooks: {
      onClearActionPayload
    }
  } = props;

  const {
    useCurrentTabObserver,
    useOpenedTabObserver,
    useActiveTabsObserver
  } = useTabs(props);

  useOpenedTabObserver((actionPayload: any | null) => {
    console.log("opened")
    setColor(actionPayload);
    onClearActionPayload();
  });

  useCurrentTabObserver(() => {
    console.log("core current");
  })

  useActiveTabsObserver((hoveringTypes: any) => {
    // console.log(hoveringTypes, "움직이는 중...");
  });

  return (
    <div className="w-full h-full bg-pink-50 hover:bg-pink-300">
      B Tab {tabLocation.join("-")}
      <div 
        className="w-full h-[200px]"
        style={
          {
            backgroundColor: color
          }
        }
      >
      </div>
    </div>
  );
}

const tabsComponent: TabsProps = {
  tabElementTable: {
    aTab: {
      title: "A Tab",
      element: (props: TabElementProps) => <AComponent {...props} />,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      isInAddMenu: true,
      tooltipMessage: "a Tab 입니다.",
      tooltipMessageByAddButton: "안녕하세요",
      leftUtilsElement
    } ,
    bTab: {
      title: "B Tab",
      element: (props: TabElementProps) => <BComponent {...props} />,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      isInAddMenu: true,
      rightUtilsElement
    },
    cTab: {
      title: "C Tab",
      element: ({ useTabsStoreHooks, tabLocation }) => (
        <div className="w-full h-full bg-pink-50 hover:bg-pink-300">
          C Tab {tabLocation.join("-")}
        </div>
      ),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      isInAddMenu: true
    }
  }
}

const Template: ComponentStory<typeof Tabs> = (args) => {

  const useTabsStoreHooks = useTabsStore();

  const openTargetTab = useOpenTargetTab({ useTabsStoreHooks });

  const openTab = useCallback(() => {
    openTargetTab("bTab", 
      { 
        actionPayload: "black",
        findATab: true
      }
    );
  }, [openTargetTab]);

  return (
    <div className="relative w-full h-screen">
      <button 
        className="absolute top-0 left-0 z-50 w-10 h-10 bg-rose-300"
        onClick={openTab}
      >
        클릭
      </button>
      <Tabs {...tabsComponent} {...args} useTabsStoreHooks={useTabsStoreHooks} /> 
    </div>
  );
}

export const Primary = Template.bind({});

Primary.args = {
  tooltipMessageByHosizonResizeBar: "수평 조정 바입니다.",
  tooltipMessageByVerticalResizeBar: "수직 조정 바입니다.",
  tooltipMessageByAddTabButton: "탭 추가 버튼입니다.",
  isActiveTooltip: true,
  defaultTabList,
  isActiveAddTabMenu: true,
  isActiveAddTabListMenu: false
}

export const Secondary = Template.bind({});

Secondary.args = {
  tooltipMessageByHosizonResizeBar: "수평 조정 바입니다.",
  tooltipMessageByVerticalResizeBar: "수직 조정 바입니다.",
  tooltipMessageByAddTabButton: "탭 추가 버튼입니다.",
  isActiveTooltip: true,
  defaultTabList: defaultTabList2,
  isActiveAddTabMenu: true,
  isActiveAddTabListMenu: false
}
