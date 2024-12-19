import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './studentdetails.css'
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaMobileRetro } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { toast } from 'react-toastify';



function StudentDetails() {

    const { id } = useParams();
    const [student, setStudent] = useState([])
    const [paymentlist, setPaymentList] = useState([])
    const [coursedetails, setCourseDetails] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        getCourseDetails();
    }, []);

    const getCourseDetails = async () => {
        try {
            const response = await axios.get(
                `https://insituite-management-backend.onrender.com/student/student-detail/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('stoken')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            // console.log("Student Details :", response)
            setStudent(response.data.studentDetails)
            setPaymentList(response.data.feeDetails.reverse())
            setCourseDetails(response.data.courseDetails)
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };


    const deleteStudent = async (id) => {
        console.log(id)
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const response = await axios.delete(`https://insituite-management-backend.onrender.com/student/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('stoken')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log("Student deleted successfully:", response.data);
                navigate('/dashboard/course-details/'+coursedetails._id)
                toast.success("Student deleted successfully");
            } catch (error) {
                console.error("Error deleting student:", error);
                toast.error("Failed to delete student. Please try again later.");
            }
        } else {
            toast.info("Student deletion canceled");
        }
    };




    return (
        <div className='student-detail-main-wrapper'>
            <div className='student-detail-wrapper'>
                <h1 style={{ fontWeight: '700', marginBottom: '10px' }} >Student full Information</h1>
                <div className='student-detail-header'>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '25px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img className='student-image-detail' src={student.imageUrl} alt="" />

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <h1 className='student-name-detail'>{student.fullName}</h1>
                            <p className='student-d-icon'> <FaLocationDot /> {student.address}</p>
                            <p className='student-d-icon'> <FaMobileRetro /> {student.phone}</p>
                            <p className='student-d-icon'><MdEmail /> {student.email}</p>
                            <p className='student-d-icon font-semibold uppercase'><FaBookOpen size={20} /> {coursedetails.courseName}</p>
                        </div>
                    </div>

                    <div className='student-btn-container'>
                        <button onClick={() => { navigate('/dashboard/update-student/' + student._id, { state: { student } }) }} className='student-edit-btn'>Edit</button>
                        <button onClick={()=>{deleteStudent(student._id)}} className='student-delete-btn'>Delete</button>
                    </div>
                </div>
            </div>
            <h1 style={{ fontWeight: '500', fontSize: '15px', color: 'blue' }}>Payment Histroy</h1>
            <div className='fee-detail-wrapper'>
                <div className="fee-detail-wrapper p-4">
                    <h2 className="text-xl font-semibold mb-4">Fee Details</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full  ">
                            <thead>
                                <tr className="bg-[#7033FF] text-white">
                                    <th className="px-4 py-2 text-left text-md font-semibold ">Full Name</th>
                                    <th className="px-4 py-2 text-left text-md font-semibold ">Phone</th>
                                    <th className="px-4 py-2 text-left text-md font-semibold ">Amount</th>
                                    <th className="px-4 py-2 text-left text-md font-semibold ">Remark</th>
                                    <th className="px-4 py-2 text-left text-md font-semibold ">Date/Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentlist && paymentlist.length > 0 ? (
                                    paymentlist.map((fee) => (
                                        <tr key={fee._id} className="hover:bg-[#7033FF] hover:text-white cursor-pointer duration-75">
                                            <td className="px-4 py-2 text-sm ">{fee.fullName}</td>
                                            <td className="px-4 py-2 text-sm ">{fee.phone}</td>
                                            <td className="px-4 py-2 text-sm ">{fee.amount}</td>
                                            <td className="px-4 py-2 text-sm ">{fee.remark}</td>
                                            <td className="px-4 py-2 text-sm ">
                                                {new Date(fee.createdAt).toLocaleString()}
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center border border-gray-300 px-4 py-2"
                                        >
                                            No Fee Details Available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default StudentDetails