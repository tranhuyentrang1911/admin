import { Button, Divider, Image, Space, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { handlePrice } from "assets/handleManyThings";
import { productListSelector } from "redux/selectors";
import { deleteProduct, fetchProductList } from "redux/slices/productSlice";

import styles from "../../../admin.module.scss";

const ProductInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProductList());
  }, []);
  const data = useSelector(productListSelector);
  const newData = data.map((item) =>
    Object.assign({}, item, { key: item.id, action: item.id })
  );
  console.log(newData);
  const handleMovePage = () => {
    navigate("/admin/add");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Ảnh",
      key: "img",
      dataIndex: "img",
      render: (img) => (
        <div style={{ width: "50px", height: "50px" }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            src={require(`assets/images/products/${img}`)}
            alt=""
          />
        </div>
      ),
    },
    {
      title: "Giá",
      key: "price",
      dataIndex: "price",
      render: (price) => <div>{handlePrice(price)}</div>,
    },

    {
      title: "Tác vụ",
      key: "action",
      dataIndex: "action",
      render: (action) => (
        <Space size="middle">
          <Link to={`./update/${action}`}>Sửa</Link>
          <Button
            type="link"
            className={styles.button_link}
            onClick={() => {
              dispatch(deleteProduct(action));
            }}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button className={styles.add_button} onClick={handleMovePage}>
        Thêm sản phẩm
      </Button>
      <Table
        pagination={{
          defaultPageSize: 5,
          // showSizeChanger: true,
          // pageSizeOptions: ["10", "20", "30"],
        }}
        columns={columns}
        dataSource={newData}
      />
    </>
  );
};

export default ProductInformation;
