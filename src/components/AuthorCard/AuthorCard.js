import React, {memo} from 'react'

function AuthorCard({author}) {
  return (
    <div className="cardProfile">
      <img
        src={`https://joeschmoe.io/api/v1/${
          author.firstName + ' ' + author.lastName
        }`}
        alt="John"
        style={{width: '100%'}}
      />
      <h1>{author.firstName + ' ' + author.lastName}</h1>
      <p className="title text-secondary">mobile : {author.phone}</p>
      <p>POSTS : {author.numPosts}</p>
      <p>LIKES : {author.numLikes}</p>
    </div>
  )
}

export default memo(AuthorCard)
