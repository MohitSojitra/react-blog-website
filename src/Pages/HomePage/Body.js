import React, {useReducer, useEffect} from 'react'
import {Container, Row, Col} from 'reactstrap'
import Card from '../../components/card/Card'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'
import NavigationBar from '../../components/NavBar/NavigationBar'
import db from '../../utils/db.json'

const initialUsers = {
  loading: true,
  users: [],
  error: '',
  pageNo: 1,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: action.loading,
        users: action.payload,
        error: '',
        pageNo: action.pageNo,
      }
    case 'FETCH_ERROR':
      return {
        loading: false,
        users: [],
        error: 'Something Went Wrong!!!',
        pageNo: 1,
      }
    default:
      return state
  }
}

function Body({match}) {
  const [state, dispatchState] = useReducer(reducer, initialUsers)

  useEffect(() => {
    let startIndex = ((match.params.pageNo || 1) - 1) * 18
    const data = db.authors.slice(startIndex, startIndex + 18)
    dispatchState({
      type: 'FETCH_SUCCESS',
      payload: data,
      error: '',
      loading: false,
      pageNo: parseInt(match.params.pageNo),
    })
  }, [match])

  return (
    <div>
      <Container>
        {/* It is usefull when we fetch data from server */}
        {state.error !== '' ? (
          <h1 className="text-center">{state.error}</h1>
        ) : (
          ''
        )}
        {state.loading ? (
          <h1 className="text-center">Loading... Please Wait...</h1>
        ) : (
          ''
        )}
        <Row>
          {state.users.map(user => {
            return (
              <Col key={user.id} md={4} sm={6} xs={12}>
                <Card
                  name={`${user.firstName} ${user.lastName}`}
                  id={user.id}
                />
              </Col>
            )
          })}
        </Row>
        <Pagination page="/" pageNo={state.pageNo} />
      </Container>
    </div>
  )
}
export default Body
