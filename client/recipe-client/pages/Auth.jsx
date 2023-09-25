import { useState } from "react"
import axios from "axios"
import {useCookies} from "react-cookie"
import { Navigate, useNavigate } from "react-router-dom"

const Auth = ()=>{
    return (
        <>
        <Login/>
        <Register/>
        </>    
    )
}


const Login = ()=>{
    //useState hooks
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    // usenavigate hook 
    const navigate = useNavigate();

    // usecookies hook for setting cookies
    const [_,setCookies] = useCookies(["access-cookie"])

    const handleSubmit = async (e)=>{
        e.preventDefault();

         try {
            const resp = await axios.post("http://localhost:3002/api/auth/login",{username,email,password});
            console.log(resp);
            setCookies("access-cookie",resp.data.token);
            window.localStorage.setItem("userId",resp.data.registeredUser._id);
            navigate("/");
        } catch (error) {
            console.log(error);
        }

        console.log(username,email,password);

    }


    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <label htmlFor="username" >Username: </label>
            <input type="text" name="username" id="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" id="email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit">Submit</button>
        </form>
    )
}

const Register = ()=>{
    //useState hooks
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    // usenavigate hook 
    const navigate = useNavigate();

    // usecookies for setting us cookies
    const [_,setCookies] = useCookies(["access-cookie"]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
           const resp = await axios.post("http://localhost:3002/api/auth/register",{username,email,password})
           console.log(resp);
           setCookies("access-cookie",resp.data.token);
           window.localStorage.setItem("userId",resp.data.createdUser._id);
           navigate("/");
        } catch (error) {
            console.log(error);
        }

        console.log(username,email,password);

    }


    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor="username" >Username: </label>
            <input type="text" name="username" value={username} onChange={(e)=>{setUsername(e.target.value);}}/>
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Auth;