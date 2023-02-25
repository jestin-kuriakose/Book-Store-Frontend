import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { onSuccess } from '../redux/userSlice'
import { requestwithTokens } from '../requests'

const Book = ({book}) => {
    const currentUser = useSelector((state)=>state.user.currentUser)
    const dispatch = useDispatch()
    const handleDelete = async (id) => {
        try{
            const res = await requestwithTokens('delete', `/books/${id}`, currentUser.refreshToken, currentUser.accessToken,false)
            
            // updating the accessToken in the state if there is a new one created 
            const newAccessToken = res.config.headers.authorization.split(" ")[1]
            if(currentUser.accessToken != newAccessToken) {
                dispatch(onSuccess({...currentUser, accessToken: newAccessToken}))
            }

            window.location.reload()
        }catch(err) {
            console.log(err)
        }
    }

  return (
    <div key={book.id} className="book-container">
        <img width={200} height={300} src={book.imageUrl? book.imageUrl : cover} alt="" />
        <p>$ {book.price}</p>
        <h3>{book.title}</h3>
        <div className='button-container'>
            <Link to={`/update/${book.id}`}>Edit</Link>
            <button onClick={()=>handleDelete(book.id)}>Delete</button>
        </div>
    </div>
  )
}

export default Book