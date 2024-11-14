import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>U-Commerse es una teinda en linea que les facilita la adquisicion de productos de alta
            calidad y con un buen servicio uwu
        </p>
          <p>
          Tenemos productos de toda clase y de muy buena calidad para todos los clientes uwu tanto en tallas como
          en diferencia y variedad
          </p>
      </div>
    </div>
  )
}

export default DescriptionBox
