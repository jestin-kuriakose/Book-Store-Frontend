import React from 'react'

const LoadingScreen = ({text="Loading..."}) => {
  return (
    <div className='loading-screen'>
        <div className='loading-container'>
            <img className='loading-spinner' src='https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif'/>
            <h1 className='loading-text'>{text}</h1>
        </div>
    </div>
  )
}

export default LoadingScreen