import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function CourseDetails() {
    const { id } = useParams();
    const [courseDetails, setCourseDetails] = useState(null); // Use `null` to represent uninitialized state
    const [studentList, setStudentList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCourseDetails();
    }, []);

    const getCourseDetails = async () => {
        try {
            const response = await axios.get(
                `https://insituite-management-backend.onrender.com/course/course-details/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('stoken')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setCourseDetails(response.data.course);
            setStudentList(response.data.studentsList || []);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const deleteCourse = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const response = await axios.delete(`https://insituite-management-backend.onrender.com/course/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('stoken')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log("Course deleted successfully:", response.data);
                navigate('/dashboard/courses');
                toast.success("Course deleted successfully");
            } catch (error) {
                console.error("Error deleting course:", error);
                toast.error("Failed to delete course. Please try again later.");
            }
        } else {
            toast.info("Course deletion canceled");
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto p-6">
            {courseDetails ? (
                <>
                    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            className="w-full md:w-1/3 object-cover"
                            src={courseDetails.imageUrl}
                            alt="course"
                        />
                        <div className="p-6 md:w-2/3">
                            <h2 className="text-2xl font-semibold text-gray-800">{courseDetails.courseName}</h2>
                            <p className="mt-2 text-gray-600">{`Price: ${courseDetails.price}`}</p>
                            <p className="mt-2 text-gray-600">{`Start Date: ${courseDetails.startingDate}`}</p>
                            <p className="mt-2 text-gray-600">{`End Date: ${courseDetails.endDate}`}</p>

                            <div className="mt-4 flex space-x-4">
                                <button
                                    onClick={() => { navigate('/dashboard/update-course/' + courseDetails._id, { state: { courseDetails } }) }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => { deleteCourse(courseDetails._id) }}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-semibold text-xl">Course Description</h4>
                                <p className="text-gray-700 mt-2">{courseDetails.description}</p>
                            </div>
                        </div>
                    </div>

                    {studentList.length > 0 ? (
                        <div className="mt-6">
                            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 text-left text-sm text-gray-600">Image</th>
                                        <th className="px-4 py-2 text-left text-sm text-gray-600">Full Name</th>
                                        <th className="px-4 py-2 text-left text-sm text-gray-600">Phone</th>
                                        <th className="px-4 py-2 text-left text-sm text-gray-600">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentList.map((student, index) => (
                                        <tr
                                            className="hover:bg-gray-100 cursor-pointer"
                                            key={index}
                                            onClick={() => { navigate('/dashboard/student-detail/' + student._id) }}
                                        >
                                            <td className="px-4 py-2">
                                                <img
                                                    src={student.imageUrl}
                                                    alt={student.fullName}
                                                    className="w-12 h-12 object-cover rounded-full"
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-700">{student.fullName}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700">{student.phone}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700">{student.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="mt-6 text-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/17134/17134620.png"
                                alt="No students"
                                className="mx-auto w-24 h-24"
                            />
                            <p className="mt-2 text-gray-600">No students enrolled in this course.</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center gap-2 mt-24">
                    <svg
                        aria-hidden="true"
                        className="w-24 h-24 text-gray-200 animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
}

export default CourseDetails;
