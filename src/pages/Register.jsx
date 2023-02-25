import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({})
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(userInfo)
    setError("")
    setIsLoading(true)
    try{
      const res = await axios.post('http://localhost:8800/register', {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
      })
      console.log(res.data)
      setIsLoading(false)
      navigate('/login')
    } catch(err) {
      console.log(err.response.data)
      setError(err.response.data)
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h1>Register</h1>
        <input onChange={(e)=>setUserInfo((prev)=>({...prev, [e.target.name]:e.target.value}))} type="text" name='name' placeholder='Your Name' required/>
        <input onChange={(e)=> setUserInfo((prev)=>({...prev, [e.target.name]: e.target.value}))} type="email" name="email" id="email" placeholder='Your Email' required/>
        <input onChange={(e)=> setUserInfo((prev)=>({...prev, [e.target.name]: e.target.value}))} type="password" name="password" placeholder='Password' id="password" required/>
        {error && <p style={{color:"indianred"}}>{error}</p>}
        <button disabled={!userInfo.name || !userInfo.email || !userInfo.password} type='submit'>{isLoading ? "Saving..." : "Register"}</button>
        <Link to={'/login'}>Existing user ? Login here !</Link>
    </form>
  )
}

export default Register