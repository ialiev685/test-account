import React from "react";
//modal portal
import { createPortal } from "react-dom";
//styles
import "./Modal.scss";
//icon
import { ReactComponent as ArrowIcon } from "../../icons/arrow.svg";

const modalRoot = document.getElementById("modal-root");

export const Modal = ({ onModal }) => {
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <div className="modal__header">
          <button className="modal__buttonClose" onClick={onModal}>
            <ArrowIcon className="iconClose" />
            Закрыть
          </button>
          <h3 className="modal__title">Личные данные</h3>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
