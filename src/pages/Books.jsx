import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import cover from '../assets/book-cover.png'
import jwt_decode from "jwt-decode"
import Book from '../components/Book';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/counterSlice';
import { requestWithoutTokens, requestwithTokens } from '../requests';
import { onSuccess } from '../redux/userSlice';

const Books = () => {
    const currentUser = useSelector((state)=> state.user.currentUser)
    const userLoggedIn = useSelector((state)=>state.user.currentUser.accessToken) ? true : false
    const dispatch = useDispatch()

    const [allBooks, setAllBooks] = useState([])
    const [pageSelected, setPageSelected] = useState(1)

    let pages = []
    const [allPages, setAllPages] = useState([])

    useEffect(()=> {
        const getBooks = async () => {
            try{
                const res = await requestwithTokens('get', '/books', currentUser.refreshToken, currentUser.accessToken, false)
                const result = res.data
                
                // updating the accessToken in the state if there is a new one created 
                const newAccessToken = res.config.headers.authorization.split(" ")[1]
                if(currentUser.accessToken != newAccessToken) {
                    dispatch(onSuccess({...currentUser, accessToken: newAccessToken}))
                }

                setAllBooks(result)
                const pageCount = (Math.ceil(result.length/5)*5) / 5

                assignPageCount(pageCount)

                let i = 1;
                let newBooks = result?.map((book, index)=> {
                    if(index < (5*i)) {
                        return {...book, count: i}
                    } else {
                        i++
                        return {...book, count: i}
                    }
                })

                setAllBooks(newBooks)

            } catch(err) {
                console.log(err)
            }
        }
        getBooks()
    },[])

    const assignPageCount = async (count) => {

        for(let i=1; i<=count; i++) {
            if(pages.includes(i)) {
                return
            }
             pages.push(i)
        }
        setAllPages(pages)

    }

    const handleLogout = async() => {
        const res = await requestwithTokens('post', '/logout', currentUser.refreshToken, currentUser.accessToken, false)

      // updating the accessToken in the state if there is a new one created 
        const newAccessToken = res.config.headers.authorization.split(" ")[1]
        if(currentUser.accessToken != newAccessToken) {
            dispatch(onSuccess({...currentUser, accessToken: newAccessToken}))
        }

        localStorage.clear();
        window.location.reload()
    }

  return (
    <div className='books'>
        <div className='cont'>
            <h1 style={{textAlign:"center"}}>Book Shop</h1>
            <Link to={'/add'}>Add New Book</Link>
            {userLoggedIn ? <button onClick={()=>handleLogout()}>Logout</button> : 
            <Link to={'/login'}>Login</Link>}
        </div>

        <p>Hello {currentUser.user_name} !</p>
        
        <div>
            {allPages.map((p, index)=> (
                <button className={pageSelected == index+1 ? "btn-selected" : ""} key={index} onClick={()=>setPageSelected(p)}>{p}</button>
            ))}
        </div>

        <div className='books-container'>
            {allBooks?.map((books, index)=>(
                 (books.count == pageSelected) && <Book key={index} book={books}/>
        ))
        
        }</div>

    </div>
  )
}

export default Books