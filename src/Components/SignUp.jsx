import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Bloghook from './Blogcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from "react-hot-toast"
import myImg from '../assets/undraw_Sign_up_n6im.png'
function SignUp() {
    const navigate = useNavigate();
    const { username, changeusername } = Bloghook();
    const [inputs, setInputs] = useState({
        username:"",
        email: "",
        password: "",
        

    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://blog-backend-lltv.onrender.com/api/v1/users/register", {
                username:inputs.username,
                email: inputs.email,
                password: inputs.password,
                
            });
            if (data.success) {
                changeusername(data?.user.id)
                localStorage.setItem("userId", data?.user._id);
               alert("user registerd succesfully ")
                navigate("/");
            } else {
                alert("E-mail or password is wrong")
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <div className='container d-flex border p-3 rounded' style={{ marginTop: '150px', padding: '30px', width: '60%' }} id="thisIsLoginDivShdow">
            <div className='border w-50 m-2 rounded d-flex align-items-center'>
                <img src={myImg} alt="image" className='w-100  rounded h-75' />
            </div>
            <div className="w-75 ms-5">
                <h4 className="d-flex justify-content-center"><u>Sign Up</u></h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-4">
                        <label htmlFor="exampleInputEmail1" className="form-label"><b>Name</b></label>
                        <input type="text" className="form-control w-100" values={inputs.name} name="name" placeholder="" onChange={handleChange} required/>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            <b>Mobile</b>
                        </label>
                        <input type="text" className="form-control" values={inputs.mobile} name="Mobile" placeholder="" onChange={handleChange} required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><b>Address</b></label>
                        <textarea className="form-control" values={inputs.address} name="address" onChange={handleChange} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><b>Username</b></label>
                        <input type="text" className="form-control" values={inputs.username} name="username" placeholder="" onChange={handleChange} required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><b>Email</b></label>
                        <input type="email" className="form-control" values={inputs.email} name="email" placeholder="" onChange={handleChange} required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
                        <input type="password" className="form-control" values={inputs.password} name="password" placeholder="" onChange={handleChange} required/>
                    </div>


                    

                    <button type="submit " className="btn  btn-primary w-100 mt-2">Submit</button>

                    <div className='d-flex justify-content-center' >
                        <p className='mt-2' >Already have account?</p><Link className="nav-link text-black fs-6" to="/login">login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
