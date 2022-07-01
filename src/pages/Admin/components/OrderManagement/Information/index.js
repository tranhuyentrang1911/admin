import { Table } from "antd";
import { handlePrice } from "assets/handleManyThings";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { orderListSelector } from "redux/selectors";

import { fetchOrderList } from "redux/slices/orderSlice";

import styles from "../../../admin.module.scss";

const OrderInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(orderListSelector);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ID Khách hàng",
      key: "userId",
      dataIndex: "userId",
      // render: (value) => (

      // ),
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
      // render: (value) => (

      // ),
    },
    {
      title: "Tổng giá",
      key: "price",
      dataIndex: "price",
      render: (value) => <>{handlePrice(value)}</>,
    },
    {
      title: "Ngày đặt",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Ghi chú",
      key: "note",
      dataIndex: "note",
    },
    {
      title: "Phương thức",
      key: "payment",
      dataIndex: "payment",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
    },
  ];
  useEffect(() => {
    dispatch(fetchOrderList());
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

export default OrderInformation;
