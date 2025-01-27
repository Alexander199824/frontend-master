import React, { useEffect, useState } from 'react'
import './ReleatedProducts.css'
//import data_product from '../Assets/data'
import Item from '../Item/Item'
import { BACK_URL } from '../../App'

function RelatedProducts(){
const [popularProducts,setPopularProducts] = useState([]);

  useEffect(()=>{
    fetch(`${BACK_URL}/popularinwomen`)
    .then((response)=> response.json())
    .then((data)=>setPopularProducts(data));


  },[])


  return (
    <div className='relatedproducts'>
      <h1>Otros Productos</h1>
      <hr />
      <div className="relatedproducts-item">
        {popularProducts.map((item,i)=>{
           return <Item key ={i} id = {item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )

}

export default RelatedProducts
