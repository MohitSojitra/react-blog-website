import React , {useState , useEffect} from "react";
import "./PostPage.css"

function PostCard(props)
{   
    const [authorName, setauthorName] = useState("");

    const fetchName = async (id)=>{
        
        let res = await fetch("https://mohitfakedata.azurewebsites.net/authors/" + id)
        let data = await res.json()
        
        setauthorName(data.firstName + " " + data.lastName)
    }
    useEffect(() => {
        
        fetchName(props.authorId);
    }, []);

    
    return(
        <div className="card w-100">
            
        <h1>{props.title}</h1>
        <div className=" p-5 ">
        <div className="mainContent mx-auto">

        {props.description}
        </div>
        </div>
        <p className="title text-secondary">Date : {new Date(props.date).toLocaleDateString()}</p>
        <p>Author : {authorName}</p>
        <p>LIKES : {props.numLikes}</p>
        </div>
    );
}
export default PostCard;