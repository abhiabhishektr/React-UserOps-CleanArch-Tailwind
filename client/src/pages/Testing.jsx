import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [liveImage, setLiveImage] = useState(null);

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setImage(userInfo.image);
        }
    }, [userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('Name is required');
            return;
        }
        if (!email.trim() || !validateEmail(email)) {
            toast.error('Invalid email format');
            return;
        }
        if (password && (password !== confirmPassword || !validatePassword(password))) {
            toast.error('Passwords must match and meet complexity requirements');
            return;
        }

        const profileData = {
            _id: userInfo._id,
            name,
            email,
            password: password ? password : undefined,
            image: selectedFile ? await uploadImage(selectedFile) : undefined,
        };

        try {
            const res = await updateProfile(profileData).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Profile Updated');
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'An error occurred');
        }
    };

    const uploadImage = (file) => {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'UMSphotos');
            data.append('cloud_name', 'dxv6je6qy');

            fetch("https://api.cloudinary.com/v1_1/dxv6je6qy/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => resolve(data.url))
                .catch(reject);
        });
    };

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setLiveImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <FormContainer>
            <h1>Update Profile</h1>
            <div style={{ width: '150px', height: '150px', backgroundColor: "gray", borderRadius: '50%', margin: '50px' }}>
                <img src={liveImage || image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-2' controlId="name">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId="image">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleImageChange}
                    />
                </Form.Group>
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">
                    Update
                </Button>
            </Form>
        </FormContainer>
    );
};

export default RegisterScreen;
