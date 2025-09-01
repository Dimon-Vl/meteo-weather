import { useContext, useEffect } from "react";
import { CommonContext } from "../../context/commonContext";
import s from "./Modal.module.scss";

const Modal = () => {
  const { error, notFound, setNotFound } = useContext(CommonContext);

  useEffect(() => {
    if (notFound) {
      const timer = setTimeout(() => setNotFound(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [notFound, setNotFound]);

  if (!notFound) return null;

  return (
    <div className={s.modal}>
      <span>{error || "Місто не знайдено"}</span>
      <button className={s.modalClose} onClick={() => setNotFound(false)}>
        ×
      </button>
    </div>
  );
};

export default Modal;
