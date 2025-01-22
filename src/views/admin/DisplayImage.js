import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayImage = ({ filename }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost/codeworld_by_cws_php/displayImage.php?filename=${filename}`, {
          responseType: 'arraybuffer'
        });

        const base64String = Buffer.from(response.data, 'binary').toString('base64');
        const imageDataUrl = `data:image/jpeg;base64,${base64String}`;

        setImageUrl(imageDataUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [filename]);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default DisplayImage;
