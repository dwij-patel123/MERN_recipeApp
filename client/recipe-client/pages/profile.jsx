import { useEffect, useState } from "react";
import getUserID from "../function/getUserID";
import axios from "axios";

const Profile = ()=>{

    const userId = getUserID();

    if(!userId){
        return <h1>Please login/Register your account</h1>
    }

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    useEffect(()=>{
        async function getProfile(){
            const response = await axios.post("http://localhost:3002/api/recipes/profile",{userId});
            setName(response.data.username);
            setEmail(response.data.email);
            console.log(response);
        }

        getProfile();
    },[]);

    return (
        <>
        <p>Name:{name}</p>
        <p>email:{email}</p>
         
        </>
        
    )
}

export default Profile;