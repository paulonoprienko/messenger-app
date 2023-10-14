import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';

const CropperModal = ({ children, showModal, closeModal }) => {
  // return createPortal(
  return (
    <Modal show={showModal} onHide={closeModal} >
      <Modal.Header closeButton>Reposition, zoom and crop</Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
}

export default CropperModal;