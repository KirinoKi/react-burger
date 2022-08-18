import styles from './modal-overlay.module.css';

import PropTypes from 'prop-types';

function ModalOverlay({onClick }) {
    
  return (
    <div className={styles.root} onClick={onClick}>
    </div>
  )
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;