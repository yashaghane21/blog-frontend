import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Bloghook from './Blogcontext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import nodata from '../assets/2953962.jpg'

function My_blog() {
    const navigate = useNavigate()
    const [blogs, setblogs] = useState([])
    const { username, changeusername } = Bloghook();

    const getAllBlogs = async () => {
        try {
            const id = localStorage.getItem("userId")
            console.log(username.user_id)
            const { data } = await axios.get(`https://blog-backend-lltv.onrender.com/api/v1/blogs/user-blog/${id}`);
            console.log(data.userblog.blogs)
            if (data?.success) {
                setblogs(data?.userblog.blogs);
            }
            else {
                console.log("AllBlogs not fetch");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (localStorage.getItem('userId') == undefined) {
            alert("login first to see your blogs")
            navigate("/login")
        } else {
            getAllBlogs()
        }
  
    }, [])
    
  return (
      <>
          <h2 className="d-flex justify-content-center my-4">Blogs</h2>
          <div className='container d-flex justify-content-center' >
              <div className='row row-cols-2 '>
                  {
                      (blogs.length == 0) ? <div className='d-flex align-items-center'><img src={nodata} alt='image' className="w-100 h-100" /> </div> :
                          blogs?.map((item, index) => (
                              <div className="card col m-3" key={index} style={{ width: '25rem', height: '32rem', cursor: 'pointer' }} id="blogCard">
                                  <img src={item.image} className="card-img-top rounded my-2" style={{
                                      width: '100%', height: '220px', border: "none"
                                  }} alt="..." />
                                  <div className="card-body">
                                      <div className='d-flex justify-content-between'>
                                          <p className="name-topic">YOU</p>
                                          <p className="name-topic">{item.topic}</p>
                                      </div>
                                      <h5 className="card-title"><b>{item.title}</b></h5>
                                      <div style={{ overflowY: 'scroll', height: '150px' }}>{item.description}</div>
                                  </div>

                              </div>
                          ))
                  }

              </div>
          </div>
      </>
  )
}

export default My_blog
