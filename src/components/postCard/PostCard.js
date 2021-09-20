import React, {useState, useEffect, useCallback} from 'react'
import './PostPage.css'
import db from '../../utils/db.json'

function PostCard(props) {
  const [authorName, setauthorName] = useState('')

  const fetchData = useCallback(() => {
    const user = db.authors[props.authorId]

    setauthorName(user.firstName + ' ' + user.lastName)
  }, [props.authorId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="card w-100">
      <h1>{props.title}</h1>
      <div className=" p-5 ">
        <div className="mainContent mx-auto">{props.description}</div>
      </div>
      <p className="title text-secondary">
        Date : {new Date(props.date).toLocaleDateString()}
      </p>
      <p>Author : {authorName}</p>
      <p>LIKES : {props.numLikes}</p>
    </div>
  )
}
export default PostCard
