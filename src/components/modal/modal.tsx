import { useEffect } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { ReactNode } from "react";

const modalsContainer = document.querySelector("#modals") as HTMLElement;

interface IModal {
  title: string;
  close: () => void;
  children?: ReactNode;
};

export function Modal({
  title,
  close,
  children,
}: IModal) {

  const handleEscKeydown = (evt: {key: string}) => {
    if (evt.key === 'Escape') {
      close()
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
        <div className={modalStyles.close} onClick={close}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={close} />
    </>,
    modalsContainer
  );
};

