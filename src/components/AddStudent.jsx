import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

function AddStudent() {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [courseId, setCourseId] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [courselist, setCourseList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getCourses();
        if (location.state) {
            const student = location.state.student;
            setFullName(student.fullName || '');
            setPhone(student.phone || '');
            setEmail(student.email || '');
            setAddress(student.address || '');
            setCourseId(student.courseId || '');
            setImageUrl(student.imageUrl || '');
        }
    }, [location]);

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('courseId', courseId);
        if (image) {
            formData.append('image', image);
        }

        const apiEndpoint = location.state
            ? `https://insituite-management-backend.onrender.com/student/${location.state.student._id}`
            : 'https://insituite-management-backend.onrender.com/student/add-student';

        const method = location.state ? axios.put : axios.post;

        method(apiEndpoint, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('stoken')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                toast.success(response.data.message || 'Student added successfully');
                navigate(location.state ? `/dashboard/student-detail/${location.state.student._id}` : '/dashboard/students');
            })
            .catch((error) => {
                toast.error('Failed to process the request. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    const getCourses = () => {
        axios.get('https://insituite-management-backend.onrender.com/course/all-courses/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('stoken')}`,
            },
        })
            .then((res) => setCourseList(res.data.courses))
            .catch((err) => console.error(err));
    };

    const fileHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-lg md:text-2xl font-bold text-center mb-6">
                {location.state ? 'Edit Student Details' : 'Add New Student'}
            </h2>
            <form onSubmit={handleAddStudent} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        placeholder="Student Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        placeholder="Phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        placeholder="Full Address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <select
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        disabled={!!location.state}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select course</option>
                        {courselist.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.courseName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        onChange={fileHandler}
                        type="file"
                        className="w-full text-sm text-gray-500"
                    />
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Student"
                            className="mt-2 h-20 w-20 rounded-md border border-gray-300"
                        />
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default AddStudent;
