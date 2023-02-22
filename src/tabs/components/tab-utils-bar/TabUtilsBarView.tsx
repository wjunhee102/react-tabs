import classNames from "classnames";
import React, { ReactElement } from "react";
import { TabElementProps } from "../..";
import { TabLocation } from "../../store/stucts/types";
import { TabsBaseProps } from "../tab-horizon-area-list/TabHorizonAreaList";
import TabSelectionArea from "../TabSelectionArea";

const PL_6          = "pl-6";
const OPACITY_0     = "opacity-0";

interface TabUtilsBarViewProps extends TabsBaseProps {
  tabLocation: TabLocation;
  selected: boolean;
  isSelectActive: boolean;
  isActiveDefaultUtilMenu: boolean;
  rightUtilsElement?: (props: TabElementProps) => ReactElement;
  leftUtilsElement?: (props: TabElementProps) => ReactElement;
  changeTargetTabLocation: () => void;
  resetTargetTabLocation: () => void;
}

const TabUtilsBarView: React.FC<TabUtilsBarViewProps> = ({
  useTabsStoreHooks,
  tabLocation,
  selected,
  isSelectActive,
  isActiveDefaultUtilMenu,
  rightUtilsElement,
  leftUtilsElement,
  changeTargetTabLocation,
  resetTargetTabLocation
}) => (
  <div 
    className={classNames("absolute top-0 right-0 h-[47px] box-border pr-6 w-fit bg-white",{
      [PL_6]: selected
    })}
  >
    <div 
      className={classNames("h-full flex overflow-hidden", {
        [OPACITY_0]: selected
      })}
    >

      {   
        leftUtilsElement? 
        leftUtilsElement({ useTabsStoreHooks, tabLocation }) 
        : <div className="w-3 h-full"></div>
      }

      {
        isActiveDefaultUtilMenu?
        <div className="flex pt-[14px] pb-[13px] border-solid border-lightGray-30">
          {
            leftUtilsElement?
            <div className="w-3 h-full border-l border-solid border-lightGray-30"></div>
            : null
          }

            <button className="p-[2px] box-border block cursor-pointer">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8333 13.8333H2.16667V2.16667H8V0.5H2.16667C1.24167 0.5 0.5 1.25 0.5 2.16667V13.8333C0.5 14.75 1.24167 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V8H13.8333V13.8333ZM9.66667 0.5V2.16667H12.6583L4.46667 10.3583L5.64167 11.5333L13.8333 3.34167V6.33333H15.5V0.5H9.66667Z" fill="#838383"/>
              </svg>
            </button>

          {
            rightUtilsElement?
            <div className="w-3 h-full border-r border-solid border-lightGray-30"></div>
            : null
          }
        </div>
        : null
      }

      {
        rightUtilsElement? rightUtilsElement({ useTabsStoreHooks, tabLocation }) : null
      }

    </div>

    <TabSelectionArea 
      selected={selected}
      isActive={isSelectActive}
      changeTargetTabLocation={changeTargetTabLocation}
      resetTargetTabLocation={resetTargetTabLocation}
    />
    
  </div>
);

export default TabUtilsBarView;