import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CollectFee() {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [remark, setRemark] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courselist, setcourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getcourses();
    }, []);

    const getcourses = () => {
        axios
            .get(`https://insituite-management-backend.onrender.com/course/all-courses/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('stoken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                setcourseList(res.data.courses);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to load courses');
            });
    };

    const submitHandler = (e) => {
        setLoading(true);
        e.preventDefault();
        axios
            .post(
                `https://insituite-management-backend.onrender.com/fee/add-fee`,
                {
                    fullName,
                    amount,
                    phone,
                    remark,
                    courseId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('stoken')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then((res) => {
                toast.success('Fee successfully submitted');
                setFullName('');
                setPhone('');
                setRemark('');
                setAmount('');
                setCourseId('');
                navigate('/dashboard/payment-history');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to submit fee');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-lg md:text-2xl font-bold text-center mb-6">Fee Collection Form</h1>
            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        required
                        value={amount}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setAmount(value);
                            }
                        }}
                        type="text"
                        placeholder="Amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <input
                        required
                        value={phone}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setPhone(value);
                            }
                        }}
                        type="text"
                        placeholder="Mobile"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Remark</label>
                    <input
                        required
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        type="text"
                        placeholder="Remark"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <select
                        required
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
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

export default CollectFee;
