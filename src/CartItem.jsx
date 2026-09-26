import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from './CartSlice.jsx';

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>
      <p>{count} {count === 1 ? 'plant' : 'plants'} in your cart</p>

      {items.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Find a plant to bring home.</p>
          <button onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-product" key={item.id}>
                <img src={item.image} alt={`${item.name} illustration`} />

                <div className="cart-product-info">
                  <h2>{item.name}</h2>
                  <p>Unit price: {formatPrice(item.price)}</p>
                  <button
                    className="delete-button"
                    onClick={() => dispatch(removeItem(item.id))}
                    aria-label={`Delete ${item.name}`}
                  >
                    Delete
                  </button>
                </div>

                <div className="cart-product-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => dispatch(updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      }))}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      }))}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                  <strong>Plant total: {formatPrice(item.price * item.quantity)}</strong>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <p>Items: {count}</p>
            <div className="cart-total">
              <strong>Total Cart Amount</strong>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button
              className="checkout-button"
              onClick={() => setCheckoutMessage('Coming Soon! Checkout is not available yet.')}
            >
              Checkout
            </button>
            {checkoutMessage && <p role="status">{checkoutMessage}</p>}
            <button className="continue-button" onClick={onContinueShopping}>
              Continue Shopping
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
