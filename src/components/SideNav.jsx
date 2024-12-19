import React from 'react';
import './dashboard.css';
import brand from '../assets/book.png';
import { Link, useLocation } from 'react-router-dom';

function SideNav() {
    const location = useLocation();

    return (
        <div className="bg-blue-600 px-4 ">
            {/* Brand Section */}
            <div className="flex flex-col md:flex-row justify-center items-center">
                <img className="h-14 w-14 rounded-full " src={brand} alt="Brand Logo" />
                <div className='hidden md:block'>
                    <h2 className="text-white text-[10px] md:text-[12px] lg:text-lg ">Course Management App</h2>
                    <p className="brand-slogan">Manage your app in an easy way</p>
                </div>
            </div>

            {/* Menu Section */}
            <div className="flex flex-col mt-4 ">
                {/* Dynamic Menu Links */}
                <Link
                    to="/dashboard"
                    className={location.pathname === '/dashboard' ? 'menu-active-link' : 'menu-link'}
                >
                    <img className='menu-icon' src="https://cdn-icons-png.flaticon.com/128/609/609803.png" alt="Home Icon" />
                    <span className='hidden md:block '>Home</span>
                </Link>
                <Link
                    to="/dashboard/courses"
                    className={location.pathname === '/dashboard/courses' ? 'menu-active-link' : 'menu-link'}
                >
                    <img className='menu-icon' src="https://cdn-icons-png.flaticon.com/128/18476/18476753.png" alt="Courses Icon" />
                    <span className='hidden md:block'>All Courses</span>
                </Link>
                <Link
                    to="/dashboard/add-course"
                    className={location.pathname === '/dashboard/add-course' ? 'menu-active-link' : 'menu-link'}
                >
                    <img className='menu-icon' src="https://cdn-icons-png.flaticon.com/128/4683/4683468.png" alt="Add Course Icon" />
                    <span className='hidden md:block'>Add Course</span>
                </Link>
                <Link
                    to="/dashboard/add-student"
                    className={location.pathname === '/dashboard/add-student' ? 'menu-active-link' : 'menu-link'}
                >
                    <img className='menu-icon' src="https://cdn-icons-png.flaticon.com/128/15587/15587903.png" alt="Add Student Icon" />
                    <span className='hidden md:block'>Add Student</span>
                </Link>
                <Link
                    to="/dashboard/students"
                    className={location.pathname === '/dashboard/students' ? 'menu-active-link' : 'menu-link'}
                >
                    <img className='menu-icon' src="https://cdn-icons-png.flaticon.com/128/12935/12935580.png" alt="Students Icon" />
                    <span className='hidden md:block'>All Students</span>
                </Link>
                <Link
                    to="/dashboard/collect-fee"
                    className={location.pathname === '/dashboard/collect-fee' ? 'menu-active-link' : 'menu-link'}
                >
                    <img className='menu-icon' src="https://cdn-icons-png.flaticon.com/128/7325/7325249.png" alt="Collect Fee Icon" />
                    <span className='hidden md:block'>Collect Fee</span>
                </Link>
                <Link
                    to="/dashboard/payment-history"
                    className={location.pathname === '/dashboard/payment-history' ? 'menu-active-link' : 'menu-link'}
                >
                    <img className='menu-icon' src="https://cdn-icons-png.flaticon.com/128/12202/12202963.png" alt="Payment History Icon" />
                    <span className='hidden md:block'>Payment History</span>
                </Link>
            </div>

            {/* Contact Section */}
            <div className="absolute bottom-10 text-white md:left-14 left:5 hidden md:block ">
                <p className='flex flex-row justify-start gap-4 items-center'>
                    <i className="fa-solid fa-address-book hidden md:block"></i> <span className='text-[10px] md:text-[15px]'>Ashutosh Singh Kushwaha</span>
                </p>
                <p className='flex flex-row justify-center gap-4 iyems-center'>
                    <i className="fa-solid fa-phone hidden md:block"></i><span className='text-[10px] md:text-[15px]'> +91-9721249043</span>
                </p>
            </div>
        </div>
    );
}

export default SideNav;
