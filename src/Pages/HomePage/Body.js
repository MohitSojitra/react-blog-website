import React, {useReducer, useEffect} from "react";
import {Container, Row, Col} from 'reactstrap';
import Card from "../../components/card/Card"
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination"
import Footer from "../../components/Footer/Footer";
import NavigationBar from "../../components/NavBar/NavigationBar"

const initialUsers = {
    loading: true,
    users: [],
    error: "",
    pageNo : 1
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {loading: action.loading, users: action.payload, error: "" , pageNo : action.pageNo}
        case 'FETCH_ERROR':
            return {loading: false, users: [], error: "Something Went Wrong!!!" , pageNo: 1 }
        default:
            return state
    }

}

function Body({match}) {

    const [state,
        dispatchState] = useReducer(reducer, initialUsers)


    useEffect(() => {
        axios.get("https://mohitfakedata.azurewebsites.net/authors")
            .then((res) => {
                let data = []
                let j = 1
                if(match.params.hasOwnProperty("pageNo")){
                    if(match.params.pageNo !== "1" && match.params.pageNo !== "0"){
                        j = parseInt(match.params.pageNo - 1) * 20 + 1;
                    }
                }
                for (let i = j-1; i < j+19; i++) {
                    data.push({
                        fullName: res.data[i].firstName + " " + res.data[i].lastName,
                        authorId: res.data[i].id
                    })
                }
                

               return  dispatchState({type: "FETCH_SUCCESS", payload: data, error: "", loading: false , pageNo : parseInt(match.params.pageNo)})
                
            })
            .catch(err => {
                console.log(err)
                return dispatchState({type: "FETCH_ERROR", payload: [], error: "Something Went Wrong", loading: false})

            });
    }, [match])

    return (
        <div>
        <NavigationBar/>
        
            <Container>
                {state.error !== ""
                    ? <h1 className="text-center">{state.error}</h1>
                    : ""}
                {state.loading
                    ? <h1 className="text-center">Loading... Please Wait...</h1>
                    : ""}
                <Row >
                    {state
                        .users
                        .map((user) => {
                            return (
                                <Col key={user.authorId} md={4} sm={6} xs={12}>
                                    <Card name={user.fullName} id={user.authorId}/>
                                </Col>
                            )
                        })}

                </Row>
            <Pagination page="/" pageNo={state.pageNo}/>
            <Footer></Footer>
            </Container>
        </div>
    )
}
export default Body;