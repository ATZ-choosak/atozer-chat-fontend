import React from "react";
import config from "@/config";
import MenuLayout from "@/components/MenuLayout";
import Feed from "@/components/Feed";

function index(): React.ReactElement {

  return (
    <div>
      <header>
        <title>{config.appName}</title>
      </header>

      <MenuLayout>
        <Feed />
      </MenuLayout>
    </div>
  );
}

export default index;
