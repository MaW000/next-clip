import React from 'react'
import { useEffect } from 'react'
const VideoData = ({videoId}) => {
useEffect(() => {
    const endpoint = `/api/video/${videoId}`
    fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((res) => {
        console.log(res)
    })
    }, [videoId])
  return (
    <div>VideoData</div>
  )
}

export default VideoData