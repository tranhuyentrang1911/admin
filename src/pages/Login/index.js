import { Button, Input } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import styles from "./login.module.scss";
import cx from "classnames";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import { signInThunk } from "redux/slices/adminSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      pass: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên tài khoản"),
      pass: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Nhập tối thiểu là 8 kí tự"),
    }),

    onSubmit: async (values) => {
      console.log(values);
      await dispatch(signInThunk(values));
      navigate("/admin");
    },
  });
  const loading = useSelector((state) => state.admin.status);

  useEffect(() => {
    const loadingModal = document.getElementById("loading");
    if (loading === "loading") {
      loadingModal.style.display = "flex";
    } else {
      loadingModal.style.display = "none";
    }
  }, [loading]);
  return (
    <div className={styles.container}>
      <Loading />
      <h2>Đăng nhập</h2>
      <div className={styles.form_group}>
        <Input
          placeholder="Nhập tên tài khoản"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.errors.name && formik.touched.name
              ? cx(styles.input, styles.active)
              : styles.input
          }
        />
        {formik.errors.name && formik.touched.name && (
          <small>{formik.errors.name}</small>
        )}
      </div>
      <div className={styles.form_group}>
        <Input
          placeholder="Nhập mật khẩu"
          name="pass"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.errors.pass && formik.touched.pass
              ? cx(styles.input, styles.active)
              : styles.input
          }
        />
        {formik.errors.pass && formik.touched.pass && (
          <small>{formik.errors.pass}</small>
        )}
      </div>
      <div>
        <Button size="large" htmlType="submit" onClick={formik.handleSubmit}>
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};

export default Login;
