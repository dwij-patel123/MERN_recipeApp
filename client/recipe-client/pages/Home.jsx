import axios from "axios";
import { useEffect, useState } from "react";
import getUserID from "../function/getUserID";

const Home = ()=>{
    // commented code need to refactor
    const [recipeData,setRecipeData] = useState([]);
    /* const [flag,setFlag] = useState(); */
    const userId = getUserID();

    if(!userId){
        alert("you forget to register or login");
    }


    useEffect(()=>{
        async function fetchData(){
            try {
            const response = await axios.get("http://localhost:3002/api/recipes");
            setRecipeData(response.data);  
            } catch (error) {
             console.log(error);   
            }
        }
        fetchData();
    },[]);


    const handleClick =async (e)=>{
        try {
        const recipeId = e.target.value;
        const response = await axios.patch("http://localhost:3002/api/recipes/saved-recipes",{userId,recipeId});
        setFlag(true);
        console.log(response);    
        } catch (error) {
            console.log(error);
        } 
    }

    /* const handleClickRemove = async(e)=>{
        try {
            const recipeId = e.target.value;
            const response = await axios.post("http://localhost:3002/recipes/saved-recipes",{userId,recipeId});
            setFlag(false);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
 */
    return (
        <>
    {recipeData.map((recipe)=>{
        const {name,description,instructions,ingredients,image,time,_id} = recipe;
        return (
            <div key={_id}>
            <img src={image}></img>
            <p>{name}</p>
            <p>{ingredients}</p>
            <p>{time}</p>
            <p>{instructions}</p>
            <p>{description}</p>

            {/* {flag ? <button value={_id}  onClick={handleClick}>Save</button> : <button value={_id}  onClick={handleClickRemove}>Clear</button>} */}
            <button value={_id}  onClick={handleClick}>Save</button>
        </div>
        )
    })}
        </>
    )
    
}

export default Home;