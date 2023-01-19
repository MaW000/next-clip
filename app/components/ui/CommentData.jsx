import { getComments } from '@/lib/prisma/comments'
import React from 'react'

async function getData(id) {
    const { messageArray } = await getComments(id)
    if(!messageArray) {
        throw new Error('Failed to fetch data')
    }
    return messageArray
}

const CommentData = async(id) => {
    const messages = await getData(id)
    console.log(messages)
  return (
    <div>CommentData</div>
  )
}

export default CommentData