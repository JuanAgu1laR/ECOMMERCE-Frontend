import { useContext } from 'react';
import { CartContext } from '../context/CartProvider';
import { useNavigate } from 'react-router-dom'; // Para redirección
import './Cart.css';

function Cart() {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2 className="cart-title">Tu carrito de compras</h2>
            {cartItems.length === 0 ? (
                <p className="cart-empty-message">El carrito está vacío.</p>
            ) : (
                <>
                    <ul className="cart-items-list">
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <div className="item-details">
                                    {/* Añadimos la imagen aquí */}
                                    {item.imagenUrl && (
                                        <img
                                            src={item.imagenUrl}
                                            alt={item.nombre}
                                            className="item-image"
                                        />
                                    )}
                                    <span className="item-name">{item.nombre}</span>
                                    <div className="quantity-controls">
                                        <button className="quantity-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                                        <span className="item-quantity">{item.quantity}</span>
                                        <button className="quantity-button" onClick={() => increaseQuantity(item.id)}>+</button>
                                    </div>
                                    <span className="item-price">{(item.precio * item.quantity).toFixed(2)} MXN</span>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <strong>Total:</strong> {total.toFixed(2)} MXN
                    </div>
                    <button
                        className="checkout-button"
                        onClick={() => navigate('/checkout')}
                    >
                        Ir al Checkout
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;