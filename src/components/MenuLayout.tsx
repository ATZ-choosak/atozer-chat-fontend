import React, { ReactNode } from "react";
import MenuLeft from "./MenuLeft";
import MenuRight from "./MenuRight";
import AppBar from "./AppBar";

type menuLayoutProp = {
  children: ReactNode;
};

function MenuLayout({ children }: menuLayoutProp): React.ReactElement {
  return (
    <div className="flex justify-center xl:justify-start 2xl:justify-center w-full min-h-screen bg-gray-200">
      <AppBar />
      <div className="bg-white fixed left-0 w-96 hidden 2xl:block">
        <MenuLeft />
      </div>
      <div className="w-[60rem] mt-16">{children}</div>
      <div className="f bg-white fixed right-0 w-96 xl:block hidden">
        <MenuRight />
      </div>
    </div>
  );
}

export default MenuLayout;
