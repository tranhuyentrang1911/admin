import { Button, Divider, Space, Typography } from "antd";
import { FastField, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import FileField from "pages/Admin/customsField/FileField";
import InputField from "pages/Admin/customsField/InputField";
import SelectField from "pages/Admin/customsField/SelectField";
import { categorySelector, currentProductSelector } from "redux/selectors";
import { fetchCategory } from "redux/slices/categorySlice";
import { fetchProductItem, updateProduct } from "redux/slices/productSlice";

import styles from "../../../admin.module.scss";

const UpdateProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  useEffect(() => {
    dispatch(fetchProductItem(params.id));
  }, []);
  const categoryList = useSelector(categorySelector);
  const categoryOption = categoryList.map((item) =>
    Object.assign({}, { value: item.id, label: item.name })
  );
  const productItem = useSelector(currentProductSelector);

  const initialValues = {
    name: productItem.name,
    categoryId: productItem.categoryId,
    img: null,
    price: productItem.price,
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
    const updateCategory = Object.assign(
      {},
      { ...values },
      {
        id: params.id,
        img: values.img.name,
        categoryName,
        price: Number(values.price),
      }
    );

    dispatch(updateProduct(updateCategory));
  };
  return (
    <>
      {/* <div>
        <Space split={<Divider type="vertical" />}>
          <Typography.Link>Link</Typography.Link>
          <Typography.Link>Link</Typography.Link>
          <Typography.Link>Link</Typography.Link>
        </Space>
      </div> */}
      <h2>Cập nhật sản phẩm</h2>
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

                <Button htmlType="submit">Cập nhật</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default UpdateProduct;
