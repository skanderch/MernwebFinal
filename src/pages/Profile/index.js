import React from "react";
import { Tabs } from "antd";
import Products from "./Products";

function Profile() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        
        
      </Tabs>
    </div>
  );
}

export default Profile;
