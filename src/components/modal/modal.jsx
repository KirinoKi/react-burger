import { useEffect } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");

export function Modal({
  title,
  onClose,
  children,
}) {

  const handleEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
    onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);


  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.modal}>
        <div className={modalStyles.title}>
          <h2 className="text text_type_main-large ml-10">{title}</h2>
        </div>
        <div className={modalStyles.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onOverlayClick: PropTypes.func,
  onEscKeydown: PropTypes.func,
  onCloseClick: PropTypes.func,
  children: PropTypes.node
};
