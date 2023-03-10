import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { onSuccess } from '../redux/userSlice';
import { requestWithoutTokens } from '../requests';
import LoadingScreen from '../components/LoadingScreen';
import Overlay from '../components/Overlay';

const Login = () => {
    const dispatch = useDispatch()
    const [loginInput, setLoginInput] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const currentUser = useSelector((state)=>state.user.currentUser)

    const handleLogin = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const result = await requestWithoutTokens('post', '/login', {
            email: loginInput.email,
            password: loginInput.password
        })

        if(result.response?.status == 403 || result.response?.status == 401) {
            setError(result.response?.data)
            setIsLoading(false)
            return 
        }
        setIsLoading(false)
        dispatch(onSuccess(result))
        navigate('/books')

    }
  return (
    <>
    {isLoading ? <LoadingScreen text={'Signing in..'}/> :
        <form className='form' onSubmit={handleLogin}>
            <h1>Login</h1>
            <h2>{currentUser.user_name}</h2>
            {currentUser?.user_email && <p>Welcome {currentUser.user_email} {currentUser.isAdmin ? "(Admin)" : "(User)"}</p>}
            <input onChange={(e)=>setLoginInput((prev)=>({...prev, [e.target.name]: e.target.value}))} type="email" placeholder='Email' name='email' required/>
            <input onChange={(e)=>setLoginInput((prev)=>({...prev, [e.target.name]: e.target.value}))} type="password" name="password" id="password" placeholder='password' required />
            {error && <p style={{color:"indianred"}}>{error}</p>}
            <button disabled={!loginInput.email || !loginInput.password} type='submit'>Login</button>
            <Link to={'/register'}>New user ? Register here !</Link>
        </form>}
        </>
  )
}

export default Login