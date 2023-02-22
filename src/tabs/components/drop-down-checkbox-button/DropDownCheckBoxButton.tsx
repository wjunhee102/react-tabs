import React from "react";

interface DropDownCheckBoxButtonProps {
  id?: string;
  checked?: boolean;
  value?: string;
  styleByLabel?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  children?: React.ReactNode | string;
}

const DropDownCheckBoxButton: React.FC<DropDownCheckBoxButtonProps> = ({
  id,
  checked,
  value,
  styleByLabel,
  onChange,
  children
}) => (
  <div
    className="w-full min-w-[98px] h-fit p-px box-content flex justify-start items-center"
  >
    <input 
      id={id}
      type="checkbox"
      className="relative block cursor-pointer box-content text-md font-bold w-[14px] h-[14px] border border-solid rounded appearance-none border-lightGray-30 checked:bg-lightPurple after:hidden checked:after:block checked:text-main checked:border-none checked:p-px after:absolute after:content-['✓'] after:leading-4 after:w-4 after:text-center after:left-0 after:top-0"
      checked={checked} 
      value={value}
      onChange={onChange}
    />
    <label 
      className="flex-auto block p-0 m-0 ml-2 font-normal leading-4 text-black cursor-pointer min-w-fit h-fit text-md"
      htmlFor={id}
      style={styleByLabel}
    >
      {children}
    </label>
  </div>
);

export default DropDownCheckBoxButton;