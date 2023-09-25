import { useState } from "react";
import getUserID from "../function/getUserID";
import axios from "axios";


const CreateRecipes = ()=>{
    const userId = getUserID();

    if(!userId){
        return (
            <h1>Please login or register</h1>
        )
    }


    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [ingredients,setIndregients] = useState("");
    const [insructions,setInsructions] = useState("");
    const [image,setImage] = useState();
    const [time,setTime] = useState(0);

    const handleImage = (e)=>{
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    const handleName = (e)=>{
        setName(e.target.value);
    }

    const handleDescription = (e)=>{
        setDescription(e.target.value);
    }

    const handleIngredients = (e)=>{
        setIndregients(e.target.value);
    }

    const handleInsructions = (e)=>{
        setInsructions(e.target.value);
    }

    const handleTime = (e)=>{
        setTime(e.target.value);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const resp = await axios.post("http://localhost:3002/api/recipes/create-recipe",{userId,name,description,ingredients});
    }


    return (
        <>
        <form encType="multipart/form-data">
    <label htmlFor="name">Name</label>
    <input type="text" name="name" id="name" value={name} onChange={handleName}/>
    <label htmlFor="description">Write Description here:</label>
    <textarea name="description" id="description" rows="5" cols="50" value={description} onChange={handleDescription}></textarea>
    <label htmlFor="ingredients">ingredients</label>
    <input type="text" name="ingredients" id="ingredients" value={ingredients}  onChange={handleIngredients}/>
    <label htmlFor="instructions">instructions</label>
    <input type="text" name="instructions" id="instructions" value={insructions}  onChange={handleInsructions}/>
    <label htmlFor="image">Image</label>
    <input type="file" name="image" id="image" onChange={handleImage}/>
    <label htmlFor="time">Cooking Time</label>
    <input type="number" name="time" id="time" value={time}  onChange={handleTime}/>
    <button type="submit" onClick={handleSubmit}>Submit</button> 
</form>
        </>
    )
}

export default CreateRecipes;