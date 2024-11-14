import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Componets/Breadcrums/Breadcrum';
import ProductDisplay from '../Componets/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Componets/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Componets/ReleatedProducts/ReleatedProducts';


const Product = () => {
  const {products} = useContext(ShopContext);
  const {productId} = useParams();
  const [product,setProduct] = useState(false);

  useEffect(()=>{
    setProduct(products.find((e)=>e.id === Number(productId)))
  },[products,productId])

  return product ? (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts id={product.id} category={product.category}/>
    </div>
  ) : null
}


export default Product