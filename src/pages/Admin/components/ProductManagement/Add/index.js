import { Button, Divider, Space, Typography } from "antd";
import { FastField, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import FileField from "pages/Admin/customsField/FileField";
import InputField from "pages/Admin/customsField/InputField";
import SelectField from "pages/Admin/customsField/SelectField";
import { categorySelector } from "redux/selectors";
import { fetchCategory } from "redux/slices/categorySlice";
import { addProduct } from "redux/slices/productSlice";

import styles from "../../../admin.module.scss";

const AddProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const categoryList = useSelector(categorySelector);
  const categoryOption = categoryList.map((item) =>
    Object.assign({}, { value: item.id, label: item.name })
  );

  const initialValues = {
    name: "",
    categoryId: null,
    img: null,
    price: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập trường này!"),
    categoryId: Yup.number()
      .required("Vui lòng chọn loại danh mục!")
      .nullable(),
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
    price: Yup.string()
      .required("Vui lòng nhập trường này")
      .matches(/^[0-9]+$/, "Giá tiền phải là một số")
      .test(
        "validatePrice",
        "Giá tiền không được nhỏ hơn 10.000đ và lớn hơn 1.000.000đ",
        (value) => {
          return value && value >= 10000 && value <= 1000000;
        }
      ),
  });
  const onSubmit = (values) => {
    let categoryName = "";
    categoryList.forEach((item) => {
      if (item.id === values.categoryId) {
        categoryName = item.name;
      }
    });
    const newCategory = Object.assign(
      {},
      { ...values },
      { img: values.img.name, categoryName, price: Number(values.price) }
    );

    dispatch(addProduct(newCategory));
  };
  return (
    <>
      <h2>Tạo sản phẩm mới</h2>
      <div className={styles.main}>
        <Formik
          enableReinitialize={true}
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
                  label="Tên sản phẩm"
                  name="name"
                  component={InputField}
                  placeholder="Nhập tên sản phẩm*"
                />
                <FastField
                  label="Danh mục"
                  name="categoryId"
                  component={SelectField}
                  options={categoryOption}
                  disabled={false}
                  placeholder="Chọn loại danh mục*"
                />
                <FastField
                  type="file"
                  label="Upload File"
                  name="img"
                  component={FileField}
                />
                <FastField
                  label="Giá tiền"
                  name="price"
                  component={InputField}
                  placeholder="Nhập giá sản phẩm*"
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

export default AddProduct;
