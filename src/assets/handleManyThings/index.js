import { message } from "antd";

export const handlePrice = (x) => {
  x = x.toLocaleString("vi", { style: "currency", currency: "VND" });
  return x;
};
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const showSuccess = (messageSuccess) => {
  message.success(`${messageSuccess} thành công`);
};

export const showError = (messageError) => {
  message.error(`${messageError} thất bại`);
};

export const showWarning = () => {
  message.warning("Có lỗi");
};
export const showMessage = (mes) => {
  message.error(mes);
};
