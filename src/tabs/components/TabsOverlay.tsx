import React from "react";

interface TabsOverlayProps {
  children?: React.ReactNode; 
}

const TabsOverlay: React.FC<TabsOverlayProps> = ({children}) => {
  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full bg-transparent pointer-events-none">
      {children}
    </div>
  );
}

export default TabsOverlay;