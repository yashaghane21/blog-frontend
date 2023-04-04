import React, { useEffect } from 'react';
import { useContext, createContext, useState } from 'react';
import { json } from 'react-router-dom';

const BlogContext = createContext();

export const Blogprovider = ({ children }) => {
    const [login, setlogin] = useState(false);
   
    const [username,setusername] = useState("");
    const [currentdata, setcurrentdata] = useState(null)

    const changelogin = () => {
        setlogin(true);
    }
    const changeusername = (name)=>{
        setusername(name)
    }
    const changecurrent = (n)=>{
        setcurrentdata(n)
    }

    const value = {
        login,
        changelogin,
        username,
        changeusername,
        currentdata,
        changecurrent
    }

    return <BlogContext.Provider value={value}>
        {children}
    </BlogContext.Provider>
}

const Bloghook = () => {
    const context = useContext(BlogContext);
    if (context == undefined) {
        throw new Error('hook is not working')
    }
    return context
}

export default Bloghook;