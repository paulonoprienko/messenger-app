import React, { useRef, useState } from 'react';
import CropperModal from './cropperModal/cropperModal';
import Cropper from 'react-easy-crop';
// import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import getCroppedImg from './cropImage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from '@chatscope/chat-ui-kit-react';

const ImageUpload = ({ image, setImage }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [imageCropped, setImageCropped] = useState(null);

  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const fileInput = useRef(null);

  const handlerClickAvatarEditBtn = () => {
    fileInput.current.click();
  }

  const openModal = () => {
    setModalOpen(!modalOpen);
  }

  const closeModal = () => {
    setModalOpen(!modalOpen);
    fileInput.current.value = null;
  }

  const onCropChange = (crop) => {
    setCrop(crop);
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  }

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(imageCropped, croppedAreaPixels);
    closeModal();
    setImage(croppedImageUrl);
  };

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // setImage(reader.result);
      setImageCropped(reader.result);
    };
    reader.onerror = err => {
      console.log(err)
    }
  }

  return (
    <>

      <div className="avatar-edit">
        <button className={image && "filled"} onClick={handlerClickAvatarEditBtn}>
          <i>
            <FontAwesomeIcon icon={faCamera} />
            <FontAwesomeIcon className="fa-plus-icon" icon={faPlus} />
          </i>
          {image && <img src={image} />}
        </button>
      </div>

      <input
        accept="image/*"
        type="file"
        onChange={(e) => {
          openModal();
          convertToBase64(e);
        }}
        ref={fileInput}
        style={{display: "none"}}
      />
      <CropperModal
        showModal={modalOpen}
        closeModal={closeModal}
      >
        <div className="crop-container">
          <Cropper
            image={imageCropped}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
        </div>
        <div className="controls">
          <RangeSlider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            tooltip="off"
            onChange={(e, zoom) => onZoomChange(zoom)}
          />
        </div>
        <div>
          <Button
            border
            direction="right"
            labelPosition="left"
            icon={<FontAwesomeIcon icon={faCheck} />}
            onClick={onCrop}
          >Done</Button>
        </div>
      </CropperModal>
    </>
  );
}

export default ImageUpload;