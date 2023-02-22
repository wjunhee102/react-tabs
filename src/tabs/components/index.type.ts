export type Position = "absolute" | "static" | "fixed" | "sticky" | "relative";

export type ContentsPosition = "contents-left"
  | "contents-center"
  | "contents-right"
  | "contents-between"
;

export type Size = "lg" | "md" | "sm" | "xs";

export type FontWeight = "font-normal"
  | "font-normal"
  | "font-bold"
  | "font-semibold"
  | "font-light"
;

export type Rounded = "rounded-none"
  | "rounded-sm"
  | "rounded"
  | "rounded-md"
  | "rounded-lg"
  | "rounded-xl"
  | "rounded-2xl"
  | "rounded-3xl"
  | "rounded-full"
;

export type ColorType = "fillColor"
  | "outlineColor"
  | "underlineColor"
  | "textColor"
  | "hoverFillColor"
;

export type Color = "primary" 
  | "transparent"
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "pink"
;

export type JustifyContent = "justify-start"
  | "justify-end"
  | "justify-center"
  | "justify-between"
  | "justify-around"
  | "justify-evenly"
;

export type JustifyItems = "justify-items-start"
  | "justify-items-end"
  | "justify-items-center"
  | "justify-items-stretch"
;

export type JustifySelf = "justify-self-start"
  | "justify-self-end"
  | "justify-self-center"
  | "justify-self-auto"
  | "justify-self-stretch"
;

export type AlignContent = "content-start"
  | "content-end"
  | "content-center"
  | "content-between"
  | "content-around"
  | "content-evenly"
;

export type AlignItems = "items-start"
  | "items-end"
  | "items-center"
  | "items-baseline"
  | "items-stretch"
;

export type AlignSelf = "self-start"
  | "self-end"
  | "self-center"
  | "self-auto"
  | "self-stretch"
  | "self-baseline"
;

export type FlexGap = "flex-gap"
  | "flex-gap-1"
  | "flex-gap-4"
  | "flex-gap-6"
  | "flex-gap-none"
;

export interface FlexOptions {
  justifyContent?: JustifyContent;
  justifyItems?: JustifyItems;
  justifySelf?: JustifySelf;
  alignContents?: AlignContent;
  alignItems?: AlignItems;
  flexGap?: FlexGap; 
}