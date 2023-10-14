import { Modal } from 'react-bootstrap';

const CropperModal = ({ children, showModal, closeModal }) => {
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