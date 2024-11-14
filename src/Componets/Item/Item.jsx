import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { BACK_URL } from '../../App'

function Item(props) {
  console.log('Image URL:', props.image);
  return (
    <div className = 'item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
            Q{props.new_price}
        </div>
        <div className="item-price-old">
            Q{props.old_price}
        </div>
      </div>

    </div>
  )
}

export default Item