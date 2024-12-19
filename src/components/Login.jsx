import React, { useState } from 'react'
import './style.css'
import sideImage from '../assets/login-image.png'
import axios from 'axios'
import { useNavigate,Link  } from 'react-router-dom'
import { toast } from 'react-toastify'

function Signup() {

    const [email, setEmail] = useState()    
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        setLoading(true)
        e.preventDefault();
        axios.post(`https://insituite-management-backend.onrender.com/user/login`,{
            email:email,
            password:password
        })
        .then(response=>{
            console.log(response.data.token)
            localStorage.setItem('sallDataUser',response.data.user)
            localStorage.setItem('stoken',response.data.token)
            localStorage.setItem('sfullName', response.data.user.fullName);
            localStorage.setItem('simage', response.data.user.imageUrl);
            localStorage.setItem('sphone', response.data.user.phone);
            toast.success(response.data.message)
            navigate('/dashboard')
            setLoading(false)
        })
        .catch(error=>{
            console.log('E:',error)
            toast.error(error.response.data.error)
            setLoading(false)
        })

       
        
    };

  

    return (
        <>
            <div className='signup-wrapper'>
                <div className='signup-box'>
                    <div className='signup-left'>
                        <img className='book-logo' src={sideImage} alt="Book" />
                        <h1 className='signup-left-heading font-bold'>Ashutosh Online Classes</h1>
                        <p className='signup-left-para'>Manage your all data in easy way</p>
                    </div>
                    <div className='signup-right'>

                        <form onSubmit={submitHandler} className='from'>
                            <h1 style={{ fontWeight: 600 }}>Login your account</h1>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' type="eamil" name="" id="" />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' type="password" name="" id="" />
                           
                            <button  type='submit'>{loading &&<i class="fa-solid fa-spinner fa-spin-pulse"></i>  }
                               Login
                            </button>
                            <span className='signup_login-Link'> <Link to="/signup">Creaet Account</Link> </span>

                        </form>
                    </div>


                </div>
            </div>


        </>
    )
}

export default Signup