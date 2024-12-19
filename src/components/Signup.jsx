import React, { useState } from 'react'
import './style.css'
import bookLogo from '../assets/book.png'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Signup() {
    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState(null)
    const [password, setPassword] = useState()
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !phone || !password || !image) {
            alert('Please fill out all fields!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('password', password);
            formData.append('image', image);
            setLoading(true)
            const response = await axios.post('https://insituite-management-backend.onrender.com/user/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response.data);
            setLoading(false)
            setFullName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setImage(null);
            setImageUrl('');
            toast.success("Your Account has been created")
            navigate('/login')

        } catch (error) {
            console.error('Error:', error);
            // toast.warning(error.response.data.error)
            toast.error(error.response.data.error, {
                position: "bottom-right",                
              });       
            setLoading(false)
        }
    };

    const fileHandler = (e) => {
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <>
            <div className='signup-wrapper'>
                <div className='signup-box'>
                    <div className='signup-left'>
                        <img className='book-logo' src={bookLogo} alt="Book" />
                        <h1 className='signup-left-heading'>RJ Online Classes</h1>
                        <p className='signup-left-para'>Manage your all data in easy way</p>
                    </div>
                    <div className='signup-right'>

                        <form onSubmit={submitHandler} className='from'>
                            <h1 style={{ fontWeight: 600 }}>Create your account</h1>
                            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='insituite full name' type="text" name="" id="" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' type="eamil" name="" id="" />
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='phone' type="number" name="" id="" />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' type="password" name="" id="" />
                            <input onChange={fileHandler} type="file" />
                            {image && <img className='logo-url' src={imageUrl} alt="logo" />}
                            <button  type='submit'>{loading &&<i class="fa-solid fa-spinner fa-spin-pulse"></i>  }
                               Signup
                            </button>
                            <span className='signup_login-Link'>If you are already register <Link to="/login">Click here</Link> </span>
                        </form>
                    </div>


                </div>
            </div>


        </>
    )
}

export default Signup