
import { useEffect, useState } from "react";
import getUserID from "../function/getUserID";
import axios from "axios";

const SavedRecipes = ()=>{
    const userId = getUserID();
    if(!userId){
        return <h1>Not registered or logged in</h1>
    }

    const [savedRecipes,setSavedRecipes] = useState([]);

    useEffect(()=>{
        async function getSavedRecipes(){
            const response = await axios.post("http://localhost:3002/api/recipes/saved-recipes",{userId});
            setSavedRecipes(response.data);
            console.log(savedRecipes);
        }

        getSavedRecipes();
    },[])


    const handleClick =async (e)=>{
        const recipeId = e.target.value;
        const response = await axios.post("http://localhost:3002/api/recipes/saved-recipes",{userId,recipeId})
        setSavedRecipes(response.data);
        console.log(response);
    }


    return <>
    {savedRecipes.map((recipe)=>{
        const {name,description,instructions,ingredients,image,time,_id} = recipe;
        return (
            <div key={_id}>
            <img src={image}></img>
            <h1>{name}</h1>
            <h1>{ingredients}</h1>
            <h1>{time}</h1>
            <h1>{instructions}</h1>
            <h1>{description}</h1>
            <button value={_id} onClick={handleClick}>Clear</button>
        </div>
        )
    })}
    
    </>
    
}

export default SavedRecipes;