import { Modal } from "react-bootstrap";

const CropperModal = ({ children, showModal, closeModal }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        {/* Reposition, zoom and crop */}
        Сдвигайте, масштабируйте и обрезайте
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CropperModal;
