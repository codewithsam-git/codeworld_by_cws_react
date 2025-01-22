import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'commonApi';
import DisplayImage from './DisplayImage';

const InsertImage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      await axios.post(BASE_URL+'/insertImage.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

<h1>image : </h1>

        <DisplayImage/>
    </div>
    
  );
};

export default InsertImage;
