import React from "react";
import TabHorizonAreaList from "./components/tab-horizon-area-list";
import TabHoveringArea from "./components/tab-hovering-area";
import TabMoveArea from "./components/tab-move-area";
import TabsOverlay from "./components/TabsOverlay";
import { UseTabsStoreType } from "./hooks/useTabsStore";
import "overlayscrollbars/css/OverlayScrollbars.css";

interface TabsViewProps {
  useTabsStoreHooks: UseTabsStoreType;
  moveTab: (e: React.MouseEvent) => void;
  moveTabButton: (e: React.MouseEvent) => void;
  correctPosition: () => void;
}

const TabsView = React.forwardRef<HTMLDivElement, TabsViewProps>(({
  useTabsStoreHooks,
  moveTab,
  moveTabButton,
  correctPosition
}, ref) => {
  return (
    <div
      id="tabs"
      ref={ref}
      className="relative w-full h-full overflow-hidden"
      onMouseMove={moveTabButton}
      onMouseUp={moveTab}
      onMouseDown={correctPosition}
    >
      <TabHorizonAreaList useTabsStoreHooks={useTabsStoreHooks} />

      <TabsOverlay>
        <TabMoveArea useTabsStoreHooks={useTabsStoreHooks} />
        <TabHoveringArea useTabsStoreHooks={useTabsStoreHooks} />
      </TabsOverlay>

    </div>
  );
});

export default TabsView;