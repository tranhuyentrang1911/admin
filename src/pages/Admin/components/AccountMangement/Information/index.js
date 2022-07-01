import { Table } from "antd";
import { handlePrice } from "assets/handleManyThings";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { orderListSelector, usersSelector } from "redux/selectors";

import { fetchOrderList } from "redux/slices/orderSlice";
import { fetchUsersThunk } from "redux/slices/usersSlice";

import styles from "../../../admin.module.scss";

const UserInformation = () => {
  const dispatch = useDispatch();

  const data = useSelector(usersSelector);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Khách hàng",
      key: "name",
      dataIndex: "name",
      // render: (value) => (

      // ),
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
  ];
  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, []);

  const newData = data.map((item) => Object.assign({}, item, { key: item.id }));

  //   const handleMovePage = () => {
  //     navigate("/admin/add");
  //   };
  return (
    <>
      <div className={styles.main}>
        <Table columns={columns} dataSource={newData} />
      </div>
    </>
  );
};

export default UserInformation;
