import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import { BACK_URL } from '../../App'
import Item from '../Item/Item'
//import new_collection from '../Assets/new_collections'


const NewCollections = () => {

  const [new_collection, setNew_Collection] = useState([]);
  
  useEffect(()=>{
    fetch(`${BACK_URL}/newcollections`)
    .then((response)=>response.json())
    .then((data)=>setNew_Collection(data));


  },[])
  return (
    <div className='new-collections'>
        <h1>Nuevas Colecciones</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item,i)=>{
                return <Item key ={i} id = {item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default NewCollections