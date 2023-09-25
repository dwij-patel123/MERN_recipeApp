import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = ()=>{
    const [cookies,setCookies] = useCookies(["access-cookie"]);

    const handleClick = ()=>{
        setCookies("access-cookie","");
        window.localStorage.removeItem("userId");
    }
    return(
        <>
        <Link to="/">Home</Link>
        {!cookies["access-cookie"] ? ( <Link to="/auth">Login/Register</Link>) : <button type="button" onClick={handleClick}>Logout</button>}
        <Link to="/saved-recipes">Saved Recipes</Link>
        <Link to="/create-recipes">Create recipes</Link>
        <Link to="/profile">Profile</Link>
        </>
    );
}

export default Navbar;