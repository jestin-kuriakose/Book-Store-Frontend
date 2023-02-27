import React from 'react'
import { CircularProgress } from '@mui/material';

const Skeleton = ({type, error}) => {
    const COUNTER = 5;

    const FeedSkeleton = () => (
        <div className="sk-container">
            <div className='sk-book-img' width={200} height={300}></div>
            <div className='sk-book-price'></div>
            <h3 className='sk-book-title'></h3>
        </div>
    )

    const Circle = () => (
        <div className='circle'>
            <CircularProgress color='inherit'/>
        </div>
    )

    const CustomLoading = () => (
        <div className='custom'>
            <div className='balls'>
                <div className='ball ball-1'></div>
                <div className='ball ball-2'></div>
                <div className='ball ball-3'></div>
            </div>
            <p className='custom-text'>{error}</p>
        </div>
    )

  if(type === "feed") return Array(COUNTER).fill(<FeedSkeleton/>)
  if(type === "circle") return (<Circle/>)
  if(type === "custom") return (<CustomLoading/>)
}

export default Skeleton