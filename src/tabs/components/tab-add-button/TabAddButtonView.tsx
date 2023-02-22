import React, { ReactElement } from "react";
import { TabElementProps } from "../..";

interface TabAddButtonViewProps {
  rightUtilsElement?: (props: TabElementProps) => ReactElement;
  leftUtilsElement?: (props: TabElementProps) => ReactElement;
  setPreAddTabLocation: (e: React.MouseEvent) => void;
  openTooltip: (e: React.MouseEvent) => void;
  closeTooltip: () => void;
}

const TabAddButtonView: React.FC<TabAddButtonViewProps> = ({
  setPreAddTabLocation,
  rightUtilsElement,
  leftUtilsElement,
  openTooltip,
  closeTooltip
}) => (
  <div className="relative flex flex-auto w-full h-full">

    <div className="box-border h-full p-1 pt-[10px] pb-[9px]">
      <button
        className="p-1 rounded w-7 h-7 hover:bg-opacity-10 text-darkGray-10 hover:text-darkGray-20 hover:bg-darkGray-20"
        onClick={setPreAddTabLocation}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>

    <div className="flex w-full h-full pr-10 overflow-y-hidden opacity-0 pointer-events-none">
      {
        leftUtilsElement?
        <div className="w-[200px]"></div>
        : null
      }
      {
        rightUtilsElement?
        <div className="w-[200px]"></div>
        : null
      }
    </div>


  </div>
);

export default TabAddButtonView;