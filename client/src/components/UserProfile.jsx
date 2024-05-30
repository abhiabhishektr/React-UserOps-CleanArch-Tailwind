import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice'; // Import the signInSuccess action

// Set the maximum content length to 10 MB for Axios
axios.defaults.maxContentLength = 10000000;

const userURL = 'http://localhost:4000/api/users';

const ProfilePage = () => {
  const dispatch = useDispatch();
  // State to hold user data
  const [userData, setUserData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hovered, setHovered] = useState(false);

useEffect(() => {
  

    if (currentUser && Object.keys(currentUser).length !== 0) {
      const fetchUserData = async () => {
        console.log("this function is working");
        try {
          const response = await axios.get(`${userURL}/currentUser`, {
              withCredentials: true,
          });
          console.log("response", response.data);
          dispatch(signInSuccess(response.data)); // Dispatch the signInSuccess action
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
}, []);



  const { currentUser } = useSelector((state) => state.user);
  const { name, email, imageUrl } = currentUser.user || {};

  // Effect to fetch user data when component mounts
  useEffect(() => {
  
    setTimeout(() => {
      setSelectedImage(imageUrl);
      const fetchedData = {
        name: name || 'Loading...',
        profession: email || 'Loading...',
        followers: 0,
        following: 0,
        posts: 0,
      };
      setUserData(fetchedData);
    }, 1000); // Simulating delay
  }, []);

  // Function to handle changing the name
  const handleChangeName = () => {
    alert('Change name functionality will be implemented soon!');
  };

  // Function to handle changing the password
  const handleChangePassword = () => {
    alert('Change password functionality will be implemented soon!');
  };

  // Function to handle changing the user image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'VITE_CLOUD_API_KEY');
      data.append('cloud_name', 'VITE_CLOUD_FOLDER');


      fetch("https://api.cloudinary.com/v1_1/dvndcfcmp/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => resolve(data.url))
        .catch(reject);
    });
  };

  const handleChangeImage = async () => {
    if (!selectedImage) {
      alert('Please select an image');
      return;
    }
    try {
      const userId = "6655b84dcd18c2d98ae176aa";
      const data = {
        userId: userId,
        image: selectedImage ? await uploadImage(selectedImage) : undefined,
      };

      const response = await axios.post(`${userURL}/uploadImage`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('Image uploaded:', response.data);
      // Update UI or show success message
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error and show error message
    }
  };

  return (
    <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-32 overflow-hidden relative">
        <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
        <div className="absolute right-0 bottom-0 mr-2 mb-2">
          <button onClick={handleChangeImage} className="absolute bottom-2 right-[100px] z-40  bg-white rounded-full p-2">
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.14 6.86a4 4 0 00-5.66 0M4 20v-3a1 1 0 011-1h14a1 1 0 011 1v3M4 8h16" />
            </svg>
          </button>
        </div>
      </div>

        {/* <img className="object-cover object-center h-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'  */}

<div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
  {selectedImage ? (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        className="object-cover object-center h-32"
        src={selectedImage}
        alt='User Profile'
      />
      {hovered && (
        <label className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <span className="text-gray-500">Change Image</span>
        </label>
      )}
    </div>
  ) : (
    <div
      className="bg-gray-200 w-full h-full rounded-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <label className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <span className="text-gray-500">Upload Image</span>
        </label>
      )}
    </div>
  )}
</div>

{/* ------------------------------------------ */}






      <div className="text-center mt-2">
        <h2 className="font-semibold">{userData ? userData.name : 'Loading'}</h2>
        <p className="text-gray-500">{userData ? userData.profession : 'Loading'}</p>
      </div>
      <div className="p-4 border-t mx-8 mt-2">
        <button onClick={handleChangeName} className="w-full block rounded-full bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 mb-2">Change Name</button>
        <button onClick={handleChangePassword} className="w-full block rounded-full bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2">Change Password</button>
      </div>
    </div>
  );
};

export default ProfilePage;
