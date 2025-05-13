import React, { useState, useContext } from 'react';
import './Checkout.css';
import Swal from 'sweetalert2'; // ✅ Importa SweetAlert
import { CartContext } from './context/CartProvider';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'; // Importamos los hooks de Stripe

function Checkout() {
  const { cartItems } = useContext(CartContext);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // Calcular el total de la compra
  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  // Función para manejar el proceso de checkout
  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = JSON.parse(localStorage.getItem('user'));
    const clienteId = userData?.id;

    if (!clienteId) {
      await Swal.fire({
        icon: 'error',
        title: 'Sesión expirada',
        text: 'Por favor, inicia sesión nuevamente.',
        confirmButtonColor: '#d33',
      });
      setLoading(false);
      return;
    }

    const detalles = cartItems.map((item) => ({
      productoId: item.id,
      cantidad: item.quantity,
    }));

    const pedidoData = {
      clienteId,
      detalles,
      nombre,
      direccion,
    };

    try {
      // 1. Solicitar el clientSecret desde tu backend PHP
      // Solicitar el clientSecret desde tu backend PHP
      const paymentIntentRes = await fetch('http://localhost/apistripe/pago.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: calcularTotal() * 100 }), // El monto debe ser en centavos
      });

      if (!paymentIntentRes.ok) {
        throw new Error(`Error en la solicitud de pago: ${paymentIntentRes.statusText}`);
      }

      const { clientSecret } = await paymentIntentRes.json();

      // 2. Confirmar el pago con la tarjeta
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: nombre,
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      if (paymentResult.paymentIntent.status === 'succeeded') {
        // 3. Si el pago fue exitoso, registrar el pedido
        const response = await fetch('http://localhost:8080/api/pedidos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pedidoData),
        });

        if (!response.ok) throw new Error('Error al guardar el pedido');

        await Swal.fire({
          icon: 'success',
          title: '¡Compra realizada con éxito!',
          text: 'Gracias por tu pedido. Te llegará pronto 🚀',
          confirmButtonColor: '#3085d6',
        });

        // Aquí podrías limpiar el carrito o redirigir si lo deseas
        // clearCart();
      } else {
        throw new Error('El pago no fue completado.');
      }

    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: 'error',
        title: 'Error al realizar la compra',
        text: error.message || 'Ocurrió un problema inesperado.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-wrapper">
      <h2>Resumen de la compra</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.nombre}</h3>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio unitario: {item.precio} MXN</p>
            <p>Subtotal: {(item.precio * item.quantity).toFixed(2)} MXN</p>
          </div>
        ))}
        {cartItems.length === 0 && <p>Tu carrito está vacío. Agrega productos para continuar.</p>}
      </div>

      <div className="checkout-summary">
        <h3>Total: {calcularTotal().toFixed(2)} MXN</h3>
      </div>

      <h3>Información de pago</h3>
      <form onSubmit={handleCheckout} className="checkout-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección de envío</label>
          <input
            type="text"
            id="direccion"
            placeholder="Ingresa tu dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tarjeta">Información de la tarjeta</label>
          <CardElement />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Realizar compra'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
