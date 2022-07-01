import {
  AppstoreOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../admin.module.scss";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Quản lý tài khoản", "account", <UsergroupAddOutlined />),
  getItem("Quản lý danh mục", "category", <PieChartOutlined />),
  getItem("Quản lý sản phẩm", "product", <DesktopOutlined />),
  getItem("Quản lý nhân viên", "3", <UsergroupAddOutlined />),
  getItem("Quản lý đơn hàng", "order", <MailOutlined />, [
    getItem("Đơn hàng đã đặt", "order-1"),
    getItem("Đơn hàng đã huỷ", "6"),
    getItem("Đơn hàng đã hoàn thành", "7"),
  ]),
  getItem("Quản lý doanh thu", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option   12", "12"),
    ]),
  ]),
  getItem("Quản lý liên hệ", "contact", <UsergroupAddOutlined />),
];
const MenuAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();
  const handleMovePage = ({ key }) => {
    if (key === "product") {
      navigate("/admin/product");
    }
    if (key === "category") {
      navigate("/admin");
    }
    if (key === "order-1") {
      navigate("/admin/order-list");
    }
    if (key === "account") {
      navigate("/admin/user-list");
    }
  };
  return (
    <div className={styles.menu}>
      <Button
        className={styles.button_menu}
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={handleMovePage}
      />
    </div>
  );
};

export default MenuAdmin;
