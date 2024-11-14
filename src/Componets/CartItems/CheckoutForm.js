import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { BACK_URL } from '../../App';
import './CheckoutForm.css';

const CheckoutForm = ({ totalAmount, userId, productosEnCarrito }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe no está completamente cargado. Intenta nuevamente en unos segundos.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      // Crear el PaymentIntent
      const response = await fetch(`${BACK_URL}/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Convertir a centavos
      });

      if (!response.ok) {
        throw new Error("No se pudo crear el Intent de pago. Verifica tu conexión o intenta de nuevo.");
      }

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('¡PAGADO!');

        // Registrar la venta en el backend
        await fetch(`${BACK_URL}/register-sale`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userId, // Puedes conservar esta línea si decides guardar el userId
            products: productosEnCarrito, // Esto puede no ser necesario si solo quieres contar ventas
            totalAmount: totalAmount, // Puedes conservar esto si necesitas el total
          })
        });
        
        // Aquí se podrían hacer otras acciones, como vaciar el carrito, mostrar un mensaje, etc.
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="card-element">
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe || isProcessing} className="submit-button">
        {isProcessing ? 'Procesando...' : 'Confirmar Pago'}
      </button>
      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}
    </form>
  );
};

export default CheckoutForm;

