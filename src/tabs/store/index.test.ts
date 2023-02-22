import { createDefaultTabList } from "../utils/createDefaultTabList";
import { TabArray } from "./stucts/tabArray";
import { TabHorizonArea } from "./stucts/types";

function covertTabToString(tabHorizonAreaList: TabHorizonArea[]) {
  return tabHorizonAreaList.map(horizonArea => 
    horizonArea.verticalAreaList.map(verticalArea => 
      verticalArea.tabList.map((tab) => tab.type).join(",")
    ).join(",")
  ).join(",");
}

const detailTab  = TabArray.createTab("detail");
const claimTab   = TabArray.createTab("claim");
const drawingTab = TabArray.createTab("drawing");

const tabsContentRect = { 
  width: 1000,
  height: 1000
}

test("add tab in list", () => {
  const tabHorizonAreaList = new TabArray()
                                  .initHorizonAreaList([[[detailTab]], [[detailTab]]]);
  const TEST_CASE1 = "detail,claim,detail";
  const TEST_CASE2 = "detail,detail,claim";

  const newTabHorizonAreaList1 = tabHorizonAreaList
                                  .addTabInList([1, 0, 0], claimTab, tabsContentRect);

  const newTabHorizonAreaList2 = tabHorizonAreaList
                                  .addTabInList([0, 2, 10], claimTab, tabsContentRect)

  const newTabHorizonAreaList3 = tabHorizonAreaList
                                  .addTabInList([2, 10, 100], claimTab, tabsContentRect)

  expect(covertTabToString(newTabHorizonAreaList1)).toEqual(TEST_CASE1);
  expect(covertTabToString(newTabHorizonAreaList2)).toEqual(TEST_CASE1);
  expect(covertTabToString(newTabHorizonAreaList3)).toEqual(TEST_CASE2);
});


test("delete tab in list", () => {

  const initTabList = [ 
    [ 
      [ detailTab, claimTab ], 
      [ detailTab ] 
    ], 
    [ 
      [ drawingTab ] 
    ] 
  ]

  const tabHorizonAreaList = new TabArray().initHorizonAreaList(initTabList);

  const TEST_CASE1 = "detail,detail,drawing";
  const TEST_CASE2 = "detail,detail";

  const newTabHorizonAreaList1 = tabHorizonAreaList.deleteTabInList([0, 0, 1]);
  const newTabHorizonAreaList2 = newTabHorizonAreaList1.deleteTabInList([1, 0, 0]);
  const newtabHorizonAreaList3 = newTabHorizonAreaList2.deleteTabInList([2, 1, 2]);

  expect(covertTabToString(newTabHorizonAreaList1)).toEqual(TEST_CASE1);
  expect(covertTabToString(newTabHorizonAreaList2)).toEqual(TEST_CASE2);
  expect(covertTabToString(newtabHorizonAreaList3)).toEqual(TEST_CASE2);
});

test("delete tabList in list", () => {

  const initTabList = [ 
    [ 
      [ detailTab, claimTab, drawingTab ], 
      [ detailTab ] 
    ], 
    [ 
      [ drawingTab ] 
    ] 
  ]

  const newTabHorizonAreaList = new TabArray().initHorizonAreaList(initTabList)
                                              .deleteTabListInList(["detail", "claim", "drawing"], [0, 0]);

  expect(newTabHorizonAreaList[0].verticalAreaList[0].tabList[0]).toBeFalsy();                                  
});

test("move tab in list", () => {
  const initTabList1 = [ 
    [ 
      [ TabArray.createTab("detail"), TabArray.createTab("claim") ], 
      [ TabArray.createTab("detail") ] 
    ], 
    [ 
      [ TabArray.createTab("drawing") ] 
    ] 
  ];

  const initTabList2 = [ 
    [ 
      [ 
        TabArray.createTab("detail"), 
        TabArray.createTab("detail"),
        TabArray.createTab("claim"),
        TabArray.createTab("drawing") 
      ]
    ]
  ];

  const tabHorizonAreaList = new TabArray().initHorizonAreaList(initTabList1);
  const tabHorizonAreaList2 = new TabArray().initHorizonAreaList(initTabList2);

  const TEST_CASE1 = "detail,detail,claim,drawing";
  const TEST_CASE2 = "detail,detail,drawing,claim";
  const TEST_CASE3 = "claim";
  const TEST_CASE4 = "detail,claim,detail,drawing";

  const newTabHorizonAreaList1 = tabHorizonAreaList.moveTabInList([0, 0, 1], [1, 0, 0], tabsContentRect);
  const newTabHorizonAreaList2 = tabHorizonAreaList.moveTabInList([0, 0, 1], [1, 0, 1], tabsContentRect);
  const newTabHorizonAreaList3 = tabHorizonAreaList.moveTabInList([0, 0, 1], [2, 0, 1], tabsContentRect);
  const newTabHorizonAreaList4 = tabHorizonAreaList.moveTabInList([0, 0, 1], [1, 1, 1], tabsContentRect);
  const newTabHorizonAreaList5 = tabHorizonAreaList.moveTabInList([0, 0, 1], [0, 0, 1], tabsContentRect);
  const newTabHorizonAreaList6 = tabHorizonAreaList2.moveTabInList([0, 0, 2], [0, 0, 1], tabsContentRect);
  const newTabHorizonAreaList7 = tabHorizonAreaList.moveTabInList([0, 0, 1], [3, 0, 1], tabsContentRect);

  expect(covertTabToString(newTabHorizonAreaList1)).toEqual(TEST_CASE1);
  expect(covertTabToString(newTabHorizonAreaList2)).toEqual(TEST_CASE2);
  expect(covertTabToString(newTabHorizonAreaList3)).toEqual(TEST_CASE2);
  expect(covertTabToString(newTabHorizonAreaList4)).toEqual(TEST_CASE2);
  expect(covertTabToString(newTabHorizonAreaList5)).toEqual(TEST_CASE4);
  expect(covertTabToString(newTabHorizonAreaList6)).toEqual(TEST_CASE4);
  expect(covertTabToString(newTabHorizonAreaList7)).toEqual(TEST_CASE2);
});

// test("new add tab in list", () => {
//   const tabHorizonAreaList = [ createNewHorizonArea(createTab("test1")) ];
//   const tab = createTab("test2");

//   const newTabHorizonAreaList = addTabInList(tabHorizonAreaList, [1, 0, 0], [tab, tab], { width: 1000, height: 1000 });
//   const newTabHorizonAreaList2 = addTabInList(newTabHorizonAreaList, [1, 0, 1], tab, { width: 1000, height: 1000 });
//   const newTabHorizonAreaList3 = deleteTabInList(newTabHorizonAreaList2, [1, 0, 0]);

//   newTabHorizonAreaList2.forEach((horizonArea, horioznIdx) => {
//     console.log(`horioznArea ${horioznIdx}`, horizonArea);

//     horizonArea.verticalAreaList.forEach((verticalArea, verticalIdx) => {
//       console.log(`vertialArea ${verticalIdx}`, verticalArea);

//       verticalArea.tabList.forEach((tab, idx) => {
//         console.log(`tab ${idx}`, tab);
//       })
//     });
//   });

//   newTabHorizonAreaList3.forEach((horizonArea, horioznIdx) => {
//     console.log(`horioznArea ${horioznIdx}`, horizonArea);

//     horizonArea.verticalAreaList.forEach((verticalArea, verticalIdx) => {
//       console.log(`vertialArea ${verticalIdx}`, verticalArea);

//       verticalArea.tabList.forEach((tab, idx) => {
//         console.log(`tab ${idx}`, tab);
//       })
//     });
//   });


// });

test("create default tab list", () => {

  const defaultTabList = createDefaultTabList([[["aa", "bb"], ["bb"], ["cc"]], [["dd"]], [["cc"]], [[]]]);
  const defaultTabList2 = createDefaultTabList([["aa"], ["bb", "ccc"]]);

  console.log(defaultTabList);

  console.log(defaultTabList2);

  console.log(defaultTabList[0][0]);

})