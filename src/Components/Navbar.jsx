import React,{useEffect,useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Bloghook from './Blogcontext'
import axios from 'axios';


function Navbar() {
    const navigate = useNavigate();
    const { username, changeusername } = Bloghook();
    const [name, setname] = useState("")
    
    const getusername = async()=>{
        try{
        const id = localStorage.getItem("userId");
        const { data } = await axios.get(`http://localhost:8080/api/v1/blogs/user-blog/${id}`)
        console.log(data.userblog.username)
        if (data?.success) {
            setname(data?.userblog.username);
        }
        else {
            console.log("AllBlogs not fetch");
        }
        }catch (error) {
        console.log(error);
        }   
    }

    useEffect(() => {
      getusername()
    }, [])
    
    
  return (
    <>
    <div>
              <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor:'#113F67'}} >
              <div className="container-fluid text-white">
                  <Link className="navbar-brand text-white" to="/"><b>ByteBlogs</b></Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <center>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav ">
                          <li className="nav-item">
                              <Link className="nav-link text-white" aria-current="page" to="/">Blogs</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link text-white" to="/myblog">MyBlogs</Link>
                          </li>
                          <li className="nav-item">
                                  <Link className="nav-link text-white" to="/CreateBlog">Create Blog</Link>
                          </li>
                          
                      </ul>
                  </div>
                  </center>
                  <div className="collapse navbar-collapse d-flex justify-content-end">
                    {
                    (localStorage.getItem('userId') != null)?
                            <div className='d-flex justify-content-between'>
                              <ul className="navbar-nav">
                                  <li className="nav-item "  >
                                          <Link className="nav-link  text-white" to="/MyBlog">{name}</Link>
                                  </li>
                              </ul>
                              <ul className="navbar-nav">
                                          <li className="nav-item my-2 rounded" style={{ cursor: 'pointer', backgroundColor:'#F3F9FB',color:'black',padding:'2px 4px'}}onClick={()=>{
                                    localStorage.clear()
                                    changeusername("")
                                    navigate("/Signup")
                                    }}>
                                        log out
                                  </li>
                              </ul>
                            </div>
                              
                    :
                    <ul className="navbar-nav">
                        <li className="nav-item">
                              <Link className="nav-link text-white" to="/Login">Login</Link>
                        </li>
                        <li className="nav-item">
                              <Link className="nav-link text-white" to="/SignUp">Sign Up</Link>
                        </li>
                    </ul>
                      
                    }
                  </div>
              </div>
          </nav>
    </div>
        
          </>
  )
}

export default Navbar
