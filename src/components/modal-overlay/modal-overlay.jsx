import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export function ModalOverlay({ onClick }) {
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClick}>
    </div>
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func
};
