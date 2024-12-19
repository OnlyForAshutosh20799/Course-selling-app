import React, { useEffect } from 'react'
import './dashboard.css'
import logo from '../assets/book.png'
import SideNav from './SideNav'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Dashboard() {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem('sallDataUser');
            localStorage.removeItem('stoken');
            localStorage.removeItem('sfullName');
            localStorage.removeItem('simage');
            localStorage.removeItem('sphone');
            toast.success("Logout successfully");
            if (!localStorage.getItem('stoken')) {
                navigate('/');
            }
        }
    };
    
    return (
        <>
            <div className='dashboard-main-container'>
                {/* <div className='dashboard-container'> */}
                <div className=' w-full md:h-[95vh] rounded-md md:w-full lg:w-[95%] h-[95vh] flex flex-row overflow-hidden '>
                    <SideNav />
                    <div className='main-container'>
                        <div className='top-bar'>                        
                            <div className='profile-container'>
                                <h2 className='profile-name'>{localStorage.getItem("sfullName")}</h2>
                                <button onClick={handleLogout} className='bg-red-600 text-white text-[12px] px-2 mx-auto md:text-[14px] rounded-sm w-1/2'>Logout</button>
                            </div>
                        </div>
                        <div style={{ padding: 10 }}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Dashboard