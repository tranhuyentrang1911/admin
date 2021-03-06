import { Col, Row } from "antd";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./admin.module.scss";
import UserInformation from "./components/AccountMangement/Information";
import CategoryManagement from "./components/CategoryManagement";
import MenuAdmin from "./components/Menu";
import OrderInformation from "./components/OrderManagement/Information";
import ProductManagement from "./components/ProductManagement";

const Admin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.admin_img}>
          <img src={require("assets/images/logo/admin.png")} alt="" />
        </div>
      </div>
      <div className={styles.left}>
        <MenuAdmin />
      </div>

      <div className={styles.right}>
        <Routes>
          <Route index element={<CategoryManagement />} />
          <Route path="/*" element={<CategoryManagement />} />
          <Route path="/product/*" element={<ProductManagement />} />
          <Route path="/order-list" element={<OrderInformation />} />
          <Route path="/user-list" element={<UserInformation />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
