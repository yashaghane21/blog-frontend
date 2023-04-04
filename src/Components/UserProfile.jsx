import React from 'react'
import Bloghook from './Blogcontext';


function UserProfile(){
   const { username, changeusername } = Bloghook();
return(
   <div className='container'>
   <p>{username}</p>
    <button>Log Out</button>
   </div>
)
}
export default  UserProfile