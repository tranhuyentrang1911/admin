import { Button, Col, Divider, Row, Space, Typography } from "antd";
import { FastField, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import styles from "pages/Admin/admin.module.scss";
import FileField from "pages/Admin/customsField/FileField";
import InputField from "pages/Admin/customsField/InputField";
import { addCategory } from "redux/slices/categorySlice";

import MenuAdmin from "../../Menu";

const AddCategory = () => {
  const initialValues = {
    name: "",
    img: null,
  };

  //const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập trường này!"),
    img: Yup.mixed()
      .nullable()
      .required("Không có tệp nào được chọn")
      .test(
        "type",
        "File không đúng định dạng là một hình ảnh: .jpeg, .jpg, .png",
        (value) => {
          return (
            value &&
            (value.type === "image/jpeg" ||
              value.type === "image/jpg" ||
              value.type === "image/png")
          );
        }
      )
      .test("fileSize", "Kích cỡ ảnh quá lớn", (value) => {
        return value && value.size <= 2000000;
      }),
  });

  const dispatch = useDispatch();
  const onSubmit = (values) => {
    const name = values.name;
    const img = values.img.name;
    dispatch(addCategory({ name, img }));
  };
  return (
    <>
      <h2>Tạo danh mục mới</h2>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          {(formikProps) => {
            const { values, errors, touched, isSubmitting } = formikProps;
            console.log({ values, errors, touched, isSubmitting });
            return (
              <Form>
                <FastField
                  label="Tên danh mục"
                  name="name"
                  component={InputField}
                  placeholder="Nhập tên danh mục*"
                />

                <FastField
                  type="file"
                  label="Upload File"
                  name="img"
                  component={FileField}
                />

                <Button htmlType="submit">Thêm mới</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default AddCategory;
