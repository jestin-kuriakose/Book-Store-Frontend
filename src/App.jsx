import { useSelector } from "react-redux"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import checkTokenExpiry from "./checkTokenExpiry"
import Add from "./pages/Add"
import Books from "./pages/Books"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Update from "./pages/Update"
import Users from "./pages/Users"


function App() {
  const userLoggedIn = useSelector((state)=>state.user.currentUser.accessToken) ? true : false

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={userLoggedIn ? <Books/> : <Login/>}/>
          <Route path="/books" element={userLoggedIn ? <Books/> : <Login/>}/>
          <Route path="/add" element={userLoggedIn ? <Add/> : <Login/>}/>
          <Route path="/update/:id" element={userLoggedIn ? <Update/> : <Login/>}/>
          <Route path="/register" element={userLoggedIn ? <Books/> : <Register/>}/>
          <Route path="/users" element={userLoggedIn ? <Users/> : <Login/>}/>
          <Route path="/login" element={userLoggedIn ? <Books/> : <Login/>}/>
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App
