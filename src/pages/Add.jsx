import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode"
import { useDispatch, useSelector } from 'react-redux'
import { onSuccess } from '../redux/userSlice'
import { requestwithTokens } from '../requests'

const Add = () => {
  const currentUser = useSelector((state)=>state.user.currentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [uploadedFile, setUploadedFile] = useState(null)
  const [fileName, setFileName] = useState()
  const [fileUrl, setFileUrl] = useState()
  const [isFetching, setIsFetching] = useState(false)
  const [errorFound, setErrorFound] = useState(false)
  const titleRef = useRef()
  const priceRef = useRef()
  const [formIncomplete, setFormIncomplete] = useState({title: false, price: false})
  const [bookInfo, setBookInfo] = useState({
    title: "",
    desc: "",
    price: null,
    imageUrl:""
  })

  const handleChange = (e) => {
    setBookInfo((prev)=> ({...prev, [e.target.name]: e.target.value}))
    console.log(bookInfo)
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    const fname = e.target.files[0].name
    setUploadedFile(file)
    setFileName(fname)
  }

  const handleSave = async () => {
    //checking if the form is complete
    if(titleRef.current.value == '') {
      setFormIncomplete({title: true})
      if(priceRef.current.value == '') {
        setFormIncomplete((prev)=>({...prev, price: true}))
      } else {
        setFormIncomplete((prev)=>({...prev, price: false}))
      }
      return
    } else {
      setFormIncomplete({title: false})
      if(priceRef.current.value == '') {
        setFormIncomplete((prev)=>({...prev, price: true}))
        return
      } else {
        setFormIncomplete((prev)=>({...prev, price: false}))
      }
      console.log(formIncomplete)
    }

    setIsFetching(true)
    setErrorFound(false)

    const formData = new FormData()
    if(uploadedFile) {
      formData.append("file", uploadedFile)
      formData.append("fileName", fileName)
    }

    formData.append("title", bookInfo.title)
    formData.append("desc", bookInfo.desc)
    formData.append("price", bookInfo.price)
    console.log(formData)
    try{
      const res = await requestwithTokens('post', '/books', formData, currentUser.accessToken, true)

      // updating the accessToken in the state if there is a new one created 
      const newAccessToken = res.config.headers.authorization.split(" ")[1]
      if(currentUser.accessToken != newAccessToken) {
          dispatch(onSuccess({...currentUser, accessToken: newAccessToken}))
      }

      setIsFetching(false)
      navigate("/")
    } catch(err) {
      console.log(err)
      setIsFetching(false)
      setErrorFound(true)
    }
  }

  useEffect(()=> {
    if(!uploadedFile) {
      setFileUrl(undefined)
      return
    }
    const objectURL = URL.createObjectURL(uploadedFile)
    setFileUrl(objectURL)
    return() => URL.revokeObjectURL(objectURL)
  },[uploadedFile])

  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input ref={titleRef} className={formIncomplete.title ? 'incomplete' : 'complete'} required type="text" placeholder='Book Title' name='title' onChange={handleChange}/>
      <textarea name="desc" id="" cols="30" rows="10" placeholder='Description' onChange={handleChange}></textarea>
      <input ref={priceRef} className={formIncomplete.price ? 'incomplete' : 'complete'} required type="number" name='price' placeholder='Price' onChange={handleChange}/>
      <img width="100" height="150" src={fileUrl} alt="" />
      <input type="file" name='cover' onChange={handleUpload}/>
      {(formIncomplete.title || formIncomplete.price) && <p style={{color:"indianred", margin:"0"}}>Please complete the required columns to continue</p>}
      {errorFound && <p style={{color:"indianred", margin:"0"}}>Error saving new book. Please try again</p>}
      {<button onClick={()=>handleSave()}>{isFetching ? 'Saving' : 'Save'}</button>}
    </div>
  )
}

export default Add