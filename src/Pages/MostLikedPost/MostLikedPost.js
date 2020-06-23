import React , {useState , useEffect} from "react";
import NavigationBar from "../../components/NavBar/NavigationBar"
import Post from "../../components/ShortPost/ShortPost";
function MostLikedPost(){
    let location = window.location;
    let whichSort =  location.pathname.split("/")[1] === "MostLikedPost" ? "numLikes" : "numComments"
    const [posts, setPosts] = useState([]);
    const [isLoading , setIsLoading] = useState(true)
    // const [whichSort , setWhichSort] = useState()





    //quick sort    time complexity  O(n*logn)

    function swap(items, leftIndex, rightIndex){
        var temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
    }




    function partition(items, left, right) {
        var pivot   = items[Math.floor((right + left) / 2)], //middle element
            i       = left, //left pointer
            j       = right; //right pointer
        while (i <= j) {
            while (items[i][whichSort] < pivot[whichSort]) {
                i++;
            }
            while (items[j][whichSort] > pivot[whichSort]) {
                j--;
            }
            if (i <= j) {
                swap(items, i, j); //swap two elements
                i++;
                j--;
            }
        }
        return i;
    }


    function quickSort(items, left, right) {
        var index;
        if (items.length > 1) {
            index = partition(items, left, right); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                quickSort(items, left, index - 1 );
            }
            if (index < right) { //more elements on the right side of the pivot
                quickSort(items, index, right);
            }
        }
        return items;
    }



    // end of quick sort
    
    const fetchPost = async ()=>{
        // let res = await fetch("http://localhost:3000/posts");
        let res = await fetch("https://mohitfakedata.azurewebsites.net/posts");
        let data = await res.json();

        let result = quickSort(data, 0, data.length - 1 );

        data = result.reverse().slice(0 , 10);
        // console.log(data)
        setIsLoading(false);
        setPosts(data);
    }
    useEffect(() => {
        
        fetchPost();
    }, [whichSort]);

    return(
        <div>
        <NavigationBar></NavigationBar>
        <div className="container">

        <ul className="list-group">
        {isLoading ? <h1 className="text-center">Loading... Please Wait....</h1> :  posts.map((post)=><Post key={post.id} title={post.title} like={post.numLikes} date={post.datePublished} id={post.id} comment={post.numComments} whichSort={whichSort}/>)}
                
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

export default MostLikedPost;