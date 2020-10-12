import React, {useState} from 'react';  //{useState} is a hook 
import {Link} from 'react-router-dom';//link is used to link to /chat path

import './Join.css';

//you declare hooks inside the function based component and nowhere else
const Join = ()=>{
    const[name,setName]=useState('');//we're passing an empty string as an initial value of 'name', setName is a function 
    const [room, setRoom]=useState('');




    return(
    <div className="joinOuterContainer">
        <div className="joinInnerContainer">
            <h1 className="heading">Join</h1>
            <div><input placeholder="username" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)} /></div>

            <div><input placeholder="Room" className="joinInput mt-20" type ="text" onChange={(event)=>setRoom(event.target.value)} /></div>

            <Link onClick={event=>(!name || !room)?event.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
                <button className="button mt-20" type="Submit">Sign In</button>
            </Link>
            
        
        
        </div>
    </div>
    
    )
}

export default Join;