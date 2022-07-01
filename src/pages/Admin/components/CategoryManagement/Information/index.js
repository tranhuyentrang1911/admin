import {
  Button,
  Col,
  Divider,
  Image,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { categorySelector } from "redux/selectors";
import { deleteCategory, fetchCategory } from "redux/slices/categorySlice";

import styles from "../../../admin.module.scss";

const CategoryInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(categorySelector);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      key: "img",
      dataIndex: "img",
      render: (img) => (
        <div style={{ width: "50px", height: "50px" }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            src={require(`assets/images/productIcons/${img}`)}
            alt=""
          />
        </div>
      ),
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
              dispatch(deleteCategory(action));
            }}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const newData = data.map((item) =>
    Object.assign({}, item, { key: item.id, action: item.id })
  );

  const handleMovePage = () => {
    navigate("/admin/add");
  };
  return (
    <>
      <Button className={styles.add_button} onClick={handleMovePage}>
        Thêm danh mục
      </Button>
      <div className={styles.main}>
        <Table columns={columns} dataSource={newData} />
      </div>
    </>
  );
};

export default CategoryInformation;
