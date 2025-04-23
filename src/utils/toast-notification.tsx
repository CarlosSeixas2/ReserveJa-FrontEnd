import { toast, type TypeOptions, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message: string, type: TypeOptions = "success") => {
  return toast(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: type,
  });
};

export const ToastContainerComponent = () => {
  return <ToastContainer />;
};
