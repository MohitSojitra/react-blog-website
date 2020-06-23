import React , {useState , useEffect} from "react";
import "./profile.css"  
import Post from "../../components/ShortPost/ShortPost"
import Footer from "../../components/Footer/Footer";
import NavigationBar from "../../components/NavBar/NavigationBar";

function Profile({match}) {
    const [posts, setPosts] = useState([]); // for Seting Post
    const [author, setAuthor] = useState({}); // for Setting Author
    const [activeButton , setActiveButton] = useState("") // for active Button


    // for fetching Post from server 
    const fetchPost = async (id)=>{
        // let res = await fetch("http://localhost:3000/posts");
        let res = await fetch("https://mohitfakedata.azurewebsites.net/posts");
        let data = await res.json();
        console.log("data")
        console.log(data);
        console.log("data")
        let posts = data.filter((post) => post.authorId === parseInt(id))
        
        setPosts(posts);

    }



    // fetching user

    const fetchUser = async (id)=>{
        // let res = await fetch(`http://localhost:3000/authors/${id}`);
        let res = await fetch(`https://mohitfakedata.azurewebsites.net/authors/${id}`);
        let data = await res.json();
    
        setAuthor(data);

    }


    // for retriveing post 
    useEffect(() => {
        // console.log("run")
        // console.log(match.params.authorId)
        fetchPost(match.params.authorId);
    } , []);
    
    
    //for retriving user
    useEffect(() => {
        fetchUser(match.params.authorId);
        // console.log("run")
    } , []);



    // Sorting By Assending Date

    function ascDate()
    {
        
        setActiveButton("ascDate");
        let data = posts;


        // bubble sort for shorting time complexity = O(n * n)

        for(let i = 0 ; i < data.length ; i++)
        {
            for(let j = 0 ; j < data.length - i - 1 ; j++)
            {
                if(data[j].datePublished > data[j+1].datePublished)
                {
                    let temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                }
            }
        }

        setPosts(data)

    }
    // Sorting By decending Date
    function dscDate()
    {
        
        setActiveButton("dscDate");
        let data = posts;


        // bubble sort for shorting time complexity = O(n * n)

        for(let i = 0 ; i < data.length ; i++)
        {
            for(let j = 0 ; j < data.length - i - 1 ; j++)
            {
                if(data[j].datePublished > data[j+1].datePublished)
                {
                    let temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                }
            }
        }

        setPosts(data.reverse())

    }

    // Sorting By Assending Like

    function ascLike()
    {
     
        setActiveButton("ascLike");
        let data = posts;


        // bubble sort for shorting time complexity = O(n * n)

        for(let i = 0 ; i < data.length ; i++)
        {
            for(let j = 0 ; j < data.length - i - 1 ; j++)
            {
                if(data[j].numLikes > data[j+1].numLikes)
                {
                    let temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                }
            }
        }

        setPosts(data)

    }
    // Sorting By decending Like
    function dscLike()
    {
        
        setActiveButton("dscLike");
        let data = posts;


        // bubble sort for shorting time complexity = O(n * n)

        for(let i = 0 ; i < data.length ; i++)
        {
            for(let j = 0 ; j < data.length - i - 1 ; j++)
            {
                if(data[j].numLikes > data[j+1].numLikes)
                {
                    let temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                }
            }
        }

        setPosts(data.reverse())

    }


    return (
        
        <div>
        <NavigationBar></NavigationBar>
            {/* <h2 style={{textAlign:"center"}}>User Profile Card</h2> */}
            {author.firstName === undefined ? <h1 className="text-center"> Please wait loading....</h1> :  <div className="cardProfile">
                    <img src={`https://joeschmoe.io/api/v1/${author.firstName + " " + author.lastName}`} alt="John" style={{width:"100%"}} />
                    <h1>{author.firstName + " " + author.lastName}</h1>
                    <p className="title text-secondary">mobile : {author.phone}</p>
                    <p>POSTS : {author.numPosts}</p>
                    <p>LIKES : {author.numLikes}</p>
            </div> }

            
            <div className="container">
            <h3 className="pt-4 pl-4 pb-3">Posts</h3>
                {/* <h2>List Group With Badges</h2> */}
                <div className="filter">    
                <div className="btn-group btn-group-lg text-center w-100 p-4">
                    <button type="button" className={`btn btn-primary ${activeButton === "ascDate" ? "active" : ""}`} onClick={ascDate}>Assending By date</button>
                    <button type="button" className={`btn btn-primary ${activeButton === "dscDate" ? "active" : ""}`} onClick={dscDate}>Decending By date</button>
                    <button type="button" className={`btn btn-primary ${activeButton === "ascLike" ? "active" : ""}`} onClick={ascLike}>Assending By Like</button>
                    <button type="button" className={`btn btn-primary ${activeButton === "dscLike" ? "active" : ""}`} onClick={dscLike}>Decending By Like</button>
                </div>
                </div>
                <ul className="list-group">
                {console.log("post post")}
                {console.log(posts)}
                {posts.length === 0 
                    ? <h1 className="text-center">loading.... </h1> 
                    : 
                    posts.map((post)=>{
                        return(
                            <Post key={post.id} title={post.title} like={post.numLikes} date={post.datePublished} id={post.id}/>
                        );
                    })
                }
                
                    
                </ul>
                </div>


                <Footer/>
            

        </div>
    )
}
export default Profile;