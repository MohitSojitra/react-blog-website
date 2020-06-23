import React, {useState, useEffect} from "react";
import PostCard from "../../components/postCard/PostCard"
import NavigationBar from "../../components/NavBar/NavigationBar";
import "./PostPage.css"
import Comment from "../../components/comments/Comment"

function PostPage({match}) {

    const [post,
        setPost] = useState({});
    const [comments,
        setComments] = useState([]);

    const fetchPost = async(id) => {

        // let res = await fetch("http://localhost:3000/posts/" + id);
        let res = await fetch("https://mohitfakedata.azurewebsites.net/posts/" + id);
        let data = await res.json();
        setPost(data);
    }

    const fetchComments = async(id) => {

        let res = await fetch("https://mohitfakedata.azurewebsites.net/comments");
        let data = await res.json();

        data = data.filter((coment) => parseInt(coment.postId) === parseInt(id))
        setComments(data);
    }

    useEffect(() => {
        fetchPost(match.params.postId);
    }, []);
    
    useEffect(() => {
        fetchComments(match.params.postId);
        
    }, []);

    return (
        <div>
            
            <NavigationBar/>
                
                {post.title === undefined ? <h1>Loading....</h1> : <PostCard title={post.title} authorId={post.authorId} date={post.datePublished} numLikes={post.numLikes} description={post.description}/>}
            
            <h4 className="mt-4 text-center">Comments</h4>
            <div className="comment-box d-flex justify-content-center">
                <br></br>
                <ul className="list-unstyled m-4 ">
                    {comments.length === 0
                        ? <h1>if comments are available then it show here.</h1>
                        : comments.map((comment) => <Comment key={comment.id} data={comment}/> )}

                </ul>
            </div>
        </div>
    )
}

export default PostPage;
