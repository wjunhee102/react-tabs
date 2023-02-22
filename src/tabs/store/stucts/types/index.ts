import { WhereToLookTypes } from "../utils/findTabLocationInList";

export interface TabStyle {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textDecoration?: string;
  textDecorationColor?: string;
  backgroundColor?: string;
}

export interface TabProperties {
  title?: string;
  style?: TabStyle;
  icon?: any;
}

export interface Tab extends TabProperties {
  type: string;
}

export interface TabVeticalArea {
  tabList: Tab[];
  areaPosition: number;
  currentTabIndex: number;
}

export interface TabHorizonArea {
  verticalAreaList: TabVeticalArea[];
  areaPosition: number;
}

export interface TabsContentRect {
  width: number;
  height: number;
}

export type TabLocation = [ number, number, number ];

export interface ChangeCurrentTabIndexInAreaListByTargetTabOptions {
  currentTabLocation?: TabLocation;
  createATab?: boolean;
  findATab?: boolean;
  whereToLook?: WhereToLookTypes;
}