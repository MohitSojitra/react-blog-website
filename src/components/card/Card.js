import React, {memo} from 'react'
import {Link} from 'react-router-dom'

function Card(props) {
  return (
    <div
      className="card specialCard mx-auto"
      style={{
        width: '18rem',
        padding: '20px',
        backgroundColor: 'rgb(246,246,246)',
        border: 'none',
        margin: '15px',
      }}
    >
      <img
        src={`https://joeschmoe.io/api/v1/${props.name}`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body text-center">
        <h5 className="card-title text-black-50">{props.name}</h5>

        <Link
          className="btn btn-primary text-white font-weight-bold"
          to={`/Profile/${props.id}`}
          id={props.id}
        >
          Click to view Profile
        </Link>
      </div>
    </div>
  )
}
export default memo(Card)
