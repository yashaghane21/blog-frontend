import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import Bloghook from './Blogcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import uu from '../assets/undraw_Content_team_re_6rlg.png' 

function CreateBlog() {
    
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('userId')==undefined){
            alert("login first to post a blog")
            navigate("/login")
        }

    }, [])
    
    // const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    });
    const [topic, settopic] = useState("")
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const selecttopic =()=>{
        let x = document.getElementById("topics").value;
        settopic(x)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id=localStorage.getItem("userId");
            console.log(topic)
            const { data } = await axios.post("https://blog-backend-lltv.onrender.com/api/v1/blogs/create-blog", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
                topic:topic,
            });
            if (data?.success) {
                // toast.success("Blog Created");
                // navigate("/my-blogs");
                alert("blog created");
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <>
        
        <div className="container my-5 d-flex border p-3 rounded creatBlogDiv">
            <div className='border w-50 m-2 rounded'>
                <img src={uu} alt="image"  className='w-100  rounded' />
            </div>
            <div className='w-75'>
                    <form className="mb-3 m-5 p-" style={{ backgroundColor: '#F3F9FB' }}>

                    <label htmlFor="exampleFormControlInput1" className="form-label fw-bolder ">Select topic:</label>
                    
                    <select className='m-2' name="cars" id="topics" onChange={selecttopic}> 
                        <option value="Sport">Sport</option>
                        <option value="Education">Education</option>
                        <option value="Space">Space</option>
                        <option value="AI">AI</option>
                        <option value="Animations">Animations</option>
                            <option value="Business">Business</option>
                        <option value=" Movies">Movie</option>
                            <option value="Current Affair">Current Affair</option>
                    </select><br/>

                <label htmlFor="exampleFormControlInput1" className="form-label fw-bolder ">Title:</label>
                    <input type="text" className="form-control w-100" id="exampleFormControlInput1" onChange={handleChange} 
                    name="title"
                    value={inputs.title}/>
            
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bolder">Description:</label>
                    <textarea onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows="3"
                        name="description"
                        value={inputs.description}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label fw-bolder">Image Url:</label>
                    <input type="text" className="form-control" id="ImageUrl" onChange={handleChange} 
                        name="image"
                        value={inputs.image}
                        />
            </div>


            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit} ><Link className="nav-link text-white"> Submit</Link></button>
            </form>
            </div>

        </div>
        </>
    );
}

export default CreateBlog