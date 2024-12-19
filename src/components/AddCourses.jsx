import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

function AddCourses() {
    const [coursename, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const courseDetails = location.state.courseDetails;
            setCourseName(courseDetails.courseName || '');
            setDescription(courseDetails.description || '');
            setPrice(courseDetails.price || '');
            setStartingDate(courseDetails.startingDate || '');
            setEndDate(courseDetails.endDate || '');
            setImageUrl(courseDetails.imageUrl || '');
        }
    }, [location]);

    const handleAddCourse = async (e) => {
        e.preventDefault();

        if (!coursename || !description || !price || !startingDate || !endDate) {
            toast.error('Please fill all fields and upload an image.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('courseName', coursename);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('startingDate', startingDate);
        formData.append('endDate', endDate);
        if (image) formData.append('image', image);

        const apiEndpoint = location.state
            ? `https://insituite-management-backend.onrender.com/course/update-course/${location.state.courseDetails._id}`
            : 'https://insituite-management-backend.onrender.com/course/add-course';

        const method = location.state ? axios.put : axios.post;

        method(apiEndpoint, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('stoken')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                toast.success(location.state ? 'Course updated successfully' : 'Course added successfully');
                navigate(location.state ? `/dashboard/course-details/${res.data.updatedData._id}` : '/dashboard/courses');
            })
            .catch(() => {
                toast.error('Failed to process the request. Please try again.');
            })
            .finally(() => setLoading(false));
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
                {location.state ? 'Edit Course' : 'Add New Course'}
            </h2>
            <form onSubmit={handleAddCourse} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Name</label>
                    <input
                        value={coursename}
                        onChange={(e) => setCourseName(e.target.value)}
                        type="text"
                        placeholder="Course Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        placeholder="Price"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        value={startingDate}
                        onChange={(e) => setStartingDate(e.target.value)}
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        onChange={fileHandler}
                        type="file"
                        accept="image/*"
                        className="w-full text-sm text-gray-500"
                    />
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Course"
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

export default AddCourses;
