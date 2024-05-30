import React, { useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', userId); // Pass userId to identify the user
      formData.append('file', selectedImage);

      const response = await axios.post('/api/uploadUserImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Image uploaded:', response.data);
      // Update UI or show success message
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error and show error message
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUploadImage}>Upload Image</button>
    </div>
  );
};

export default ProfilePage;
