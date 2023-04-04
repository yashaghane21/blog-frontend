import React ,{useState} from 'react'
import {Link} from 'react-router-dom'
import Bloghook from './Blogcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import myImg from '../assets/undraw_Login_re_4vu2.png'


function Login() {
    const navigate= useNavigate();
    const { username, changeusername } = Bloghook();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://blog-backend-lltv.onrender.com/api/v1/users/login", {
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                changeusername(data?.user.id)
                localStorage.setItem("userId",data?.user._id);
                alert("User login Successfully")
                navigate("/");
            }else{
                alert("E-mail or password is wrong")
                navigate("/login")
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
      <div className='container d-flex border p-3 rounded' style={{marginTop:'150px',padding:'30px',width:'60%'}} id="thisIsLoginDivShdow">
          <div className='border w-50 m-2 rounded'>
              <img src={myImg} alt="image" className='w-100  rounded' />
          </div>
          <div  className="w-75 ms-5">
          <h4 className="d-flex justify-content-center"><u>Log In</u></h4>
          <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-4">
                      <label htmlFor="exampleInputEmail1" className="form-label"><b>Email</b></label>
                  <input type="email" className="form-control w-100" values={inputs.email}  name="email" placeholder="" onChange={handleChange}/>

              </div>
              <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
                  <input type="password" className="form-control" values={inputs.password} name="password"  placeholder="" onChange={handleChange}/>
              </div>
              
                  <button type="submit " className="btn  btn-primary w-100 mt-2">Submit</button>

              <div className='d-flex justify-content-center' > 
                  <p className='mt-2' >Don't have account ?</p><Link className="nav-link text-black fs-6"  to="/SignUp">SignUp</Link>
              </div>
          </form>
          </div>
    </div>
  )
}

export default Login
