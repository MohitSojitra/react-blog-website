import React, {useState, useEffect, useCallback} from 'react'
import './profile.css'

import Footer from '../../components/Footer/Footer'
import NavigationBar from '../../components/NavBar/NavigationBar'
import db from '../../utils/db.json'
import AuthorCard from '../../components/AuthorCard/AuthorCard'
import FilterHeader from '../../components/FilterHeader/FilterHeader'
import UserPostList from '../../components/UserPostsList/UserPostList'

function Profile({match}) {
  const [posts, setPosts] = useState([]) // for Seting Post
  const [author, setAuthor] = useState({}) // for Setting Author
  const [activeButton, setActiveButton] = useState('') // for active Button

  // for fetching Post from server
  const fetchPost = useCallback(async id => {
    let posts = db.posts.filter(post => post.authorId === parseInt(id))

    setPosts(posts)
  }, [])

  // fetching user
  const fetchUser = useCallback(async id => {
    const user = db.authors[id]
    setAuthor(user)
  }, [])

  // for retriveing post
  useEffect(() => {
    fetchPost(match.params.authorId)
  }, [fetchPost, match.params.authorId])

  //for retriving user
  useEffect(() => {
    fetchUser(match.params.authorId)
  }, [fetchUser, match.params.authorId])

  // Sorting By Assending Date
  const ascDate = useCallback(() => {
    setActiveButton('ascDate')
    let data = posts

    // bubble sort for shorting time complexity = O(n * n)
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].datePublished > data[j + 1].datePublished) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }

    setPosts([...data])
  }, [posts])

  // Sorting By decending Date
  const dscDate = useCallback(() => {
    setActiveButton('dscDate')
    let data = posts

    // bubble sort for shorting time complexity = O(n * n)

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].datePublished > data[j + 1].datePublished) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }
    setPosts([...data.reverse()])
  }, [posts])

  // Sorting By Assending Like
  const ascLike = useCallback(() => {
    setActiveButton('ascLike')
    let data = posts

    // bubble sort for shorting time complexity = O(n * n)

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].numLikes > data[j + 1].numLikes) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }

    setPosts([...data])
  }, [posts])

  // Sorting By decending Like
  const dscLike = useCallback(() => {
    setActiveButton('dscLike')
    let data = posts

    // bubble sort for shorting time complexity = O(n * n)

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].numLikes > data[j + 1].numLikes) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }

    setPosts([...data.reverse()])
  }, [posts])

  return (
    <div>
      {/* Author Details */}
      <AuthorCard author={author} />

      <div className="container">
        <h3 className="pt-4 pl-4 pb-3">Posts</h3>

        {/* Filter Header */}
        <FilterHeader
          activeButton={activeButton}
          ascDate={ascDate}
          dscDate={dscDate}
          ascLike={ascLike}
          dscLike={dscLike}
        />

        <UserPostList posts={posts} />
      </div>
    </div>
  )
}
export default Profile
