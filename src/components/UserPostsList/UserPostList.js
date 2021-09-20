import React, {memo} from 'react'
import Post from '../ShortPost/ShortPost'
function UserPostList({posts}) {
  return (
    <ul className="list-group">
      {posts.length === 0 ? (
        <h1 className="text-center">loading.... </h1>
      ) : (
        posts.map(post => {
          return (
            <Post
              key={post.id}
              title={post.title}
              like={post.numLikes}
              date={post.datePublished}
              id={post.id}
            />
          )
        })
      )}
    </ul>
  )
}

export default memo(UserPostList)
