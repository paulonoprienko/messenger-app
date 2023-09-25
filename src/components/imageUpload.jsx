import React from 'react';

const ImageUpload = ({ setImage }) => {

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = err => {
      console.log(err)
    }
  }

  return (
    <input
      accept="image/*"
      type="file"
      onChange={convertToBase64}
    />
  );
}

export default ImageUpload;