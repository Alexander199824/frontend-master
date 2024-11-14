import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Componets/Assets/dropdown_icon.png'
import Item from '../Componets/Item/Item'
import { BACK_URL } from '../App'
import { Link } from 'react-router-dom'


const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => { 
    fetch(`${BACK_URL}/allproducts`) 
            .then((res) => res.json()) 
            .then((data) => setAllProducts(data))
    }

    useEffect(() => {
      fetchInfo();
    }, [])


    return (
      <div className="shopcategory">
        <img src={props.banner} className="shopcategory-banner" alt="" />
        <div className="shopcategory-indexSort">
          <p><span>Mostrando 1 - 12</span> de 54 Productos</p>
          <div className="shopcategory-sort">Filtrar por  <img src={dropdown_icon} alt="" /></div>
        </div>
        <div className="shopcategory-products">
          {allproducts.map((item,i) => {
              if(props.category===item.category)
              {
                return <Item id={item.id} key={i} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>;
              }
              else
              {
                return null;
              }
          })}
        </div>
        <div className="shopcategory-loadmore">
        <Link to='/' style={{ textDecoration: 'none' }}>Explorar mas</Link>
        </div>
      </div>
    );
  };

export default ShopCategory