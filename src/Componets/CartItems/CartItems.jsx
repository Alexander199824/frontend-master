import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import CheckoutForm from './CheckoutForm';

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Estado para mostrar el formulario de pago

  const totalAmount = getTotalCartAmount();

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Productos</p>
        <p>Descripcion</p>
        <p>Precio</p>
        <p>Cantidad</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>Q{e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>Q{e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Total de carro</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Q{totalAmount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Envio</p>
              <p>Gratis</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Q{totalAmount}</h3>
            </div>
          </div>
          {/* Mostrar el formulario de pago al hacer clic en "PAGAR" */}
          <button onClick={() => setShowPaymentForm(!showPaymentForm)}>PAGAR</button>
          {showPaymentForm ? (
            <div className="payment-form-container">
              <h2>Formulario de Pago</h2>
              <CheckoutForm totalAmount={totalAmount} />
            </div>
          ) : null}
        </div>
        <div className="cartitems-promocode">
          <p>Manito si tienes un copdio de promocion ingresalo aca</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Codigo de promocio' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
