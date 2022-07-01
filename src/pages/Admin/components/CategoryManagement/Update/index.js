import { Button, Col, Divider, Row, Space, Typography } from "antd";
import { FastField, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import FileField from "pages/Admin/customsField/FileField";
import InputField from "pages/Admin/customsField/InputField";
import { categoryItemSelector } from "redux/selectors";
import { fetchCategoryItem, updateCategory } from "redux/slices/categorySlice";

import styles from "../../../admin.module.scss";

const UpdateCategory = () => {
  const params = useParams();
  const idc = params.id;
  const dispatch = useDispatch();
  const { id, name, img } = useSelector(categoryItemSelector);
  const categoryItem = { id, name, img };
  const initialValues = { ...categoryItem, img: null };

  useEffect(() => {
    dispatch(fetchCategoryItem(idc));
  }, []);
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
  const onSubmit = (values) => {
    const id = idc;
    const name = values.name;
    const img = values.img.name;
    dispatch(updateCategory({ id, name, img }));
  };
  return (
    <>
      <h2>Chỉnh sửa danh mục</h2>
      <div className={styles.main}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
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

                <Button htmlType="submit">Update</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default UpdateCategory;
