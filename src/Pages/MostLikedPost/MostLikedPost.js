import React, {useState, useEffect, useMemo, useCallback} from 'react'
import NavigationBar from '../../components/NavBar/NavigationBar'
import Post from '../../components/ShortPost/ShortPost'
import db from '../../utils/db.json'
function MostLikedPost() {
  let whichSort = useMemo(
    () =>
      window.location.pathname.split('/')[1] === 'MostLikedPost'
        ? 'numLikes'
        : 'numComments',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [window.location.pathname],
  )

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [whichSort , setWhichSort] = useState()

  //quick sort    time complexity  O(n*logn)
  const swap = useCallback((items, leftIndex, rightIndex) => {
    var temp = items[leftIndex]
    items[leftIndex] = items[rightIndex]
    items[rightIndex] = temp
  }, [])

  const partition = useCallback(
    (items, left, right) => {
      var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right //right pointer
      while (i <= j) {
        while (items[i][whichSort] < pivot[whichSort]) {
          i++
        }
        while (items[j][whichSort] > pivot[whichSort]) {
          j--
        }
        if (i <= j) {
          swap(items, i, j) //swap two elements
          i++
          j--
        }
      }
      return i
    },
    [swap, whichSort],
  )

  const quickSort = useCallback(
    (items, left, right) => {
      var index
      if (items.length > 1) {
        index = partition(items, left, right) //index returned from partition
        if (left < index - 1) {
          //more elements on the left side of the pivot
          quickSort(items, left, index - 1)
        }
        if (index < right) {
          //more elements on the right side of the pivot
          quickSort(items, index, right)
        }
      }
      return items
    },
    [partition],
  )

  // end of quick sort
  const fetchPost = useCallback(() => {
    let data = db.posts

    let result = quickSort(data, 0, data.length - 1)

    data = result.reverse().slice(0, 10)
    // console.log(data)
    setIsLoading(false)
    setPosts([...data])
  }, [quickSort])

  useEffect(() => {
    fetchPost()
  }, [fetchPost, whichSort])

  return (
    <div>
      <div className="container">
        <ul className="list-group">
          {isLoading ? (
            <h1 className="text-center">Loading... Please Wait....</h1>
          ) : (
            posts.map(post => (
              <Post
                key={post.id}
                title={post.title}
                like={post.numLikes}
                date={post.datePublished}
                id={post.id}
                comment={post.numComments}
                whichSort={whichSort}
              />
            ))
          )}

          {/* <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post> */}
        </ul>
      </div>
    </div>
  )
}

export default MostLikedPost
