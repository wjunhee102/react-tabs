import React from "react";

interface NoneTabAreaViewProps {
  setPreAddTabLocation: (e: React.MouseEvent) => void;
  verticalAreaStyle?: { height: string };
}

const NoneTabAreaView: React.FC<NoneTabAreaViewProps> = ({
  setPreAddTabLocation,
  verticalAreaStyle
}) => (
  <div 
    className="flex items-center justify-center w-full h-full overflow-auto"
    style={verticalAreaStyle}
  >
    <button
      className="font-normal hover:font-bold"
      onClick={setPreAddTabLocation} 
    >
      추가
    </button>
  </div>
);

export default NoneTabAreaView;