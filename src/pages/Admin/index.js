import React, { useEffect } from "react";
import { Tabs } from "antd";
import Products from "./Products";
import Users from "./Users";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './admin.css'; // Import the CSS file for styling

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user.role, navigate]);

  return (
    <div className="admin-container">
      <div className="admin-tabs">
        <Tabs tabBarStyle={{ color: "#e0e0e0" }}>
          <Tabs.TabPane tab="Products" key="1">
            <Products />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Users" key="2">
            <Users />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Admin;
