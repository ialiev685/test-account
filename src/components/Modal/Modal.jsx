import React, { useEffect } from "react";
//modal portal
import { createPortal } from "react-dom";
//styles
import "./Modal.scss";
//icon
import { ReactComponent as ArrowIcon } from "../../icons/arrow.svg";

const modalRoot = document.getElementById("modal-root");

export const Modal = ({ onModal, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onModal();
    }
  };

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal__header">
          <button className="modal__buttonClose" onClick={onModal}>
            <ArrowIcon className="iconClose" />
            Закрыть
          </button>
          <h3 className="modal__title">Личные данные</h3>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
