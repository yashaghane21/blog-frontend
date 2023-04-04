// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CreateBlog from './Components/CreateBlog'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Blogs from './Components/Blogs'
import My_blog from './Components/My_Blog'
import Footer from './Components/Footer'
// import UserProfile from './Components/UserProfile'
import { Blogprovider } from './Components/Blogcontext'

function App() {
  

  return (
    <Blogprovider>
    <BrowserRouter>
    <Navbar/>

    <Routes>
        <Route exact path='/' element={<Blogs />} />     
       
       
        <Route exact path='/CreateBlog' element={<CreateBlog />} />  
        <Route exact path='/myblog' element={<My_blog />} />  
        
        <Route exact path='/Login' element={<Login />} />  
        <Route exact path='/SignUp' element={<SignUp />} />  
    </Routes> 
    <Footer/>
    </BrowserRouter>
    </Blogprovider>
  )
}

export default App
