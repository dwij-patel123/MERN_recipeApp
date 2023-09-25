import { BrowserRouter as Router , Routes,Route } from "react-router-dom";

import Home from "../pages/Home";
import Auth from "../pages/Auth";
import SavedRecipes from "../pages/saved-recipes";
import CreateRecipes from "../pages/create-recipes";
import Navbar from "../components/navbar";
import Profile from "../pages/profile"


function App() {
    return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/saved-recipes" element={<SavedRecipes/>}/>
          <Route path="/create-recipes" element={<CreateRecipes/>}/>
          <Route path="/profile" element={<Profile/>}  />
        </Routes>
      </Router>
    )
}

export default App
