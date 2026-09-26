import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import { selectCartCount } from './CartSlice.jsx';
import './App.css';

function getPage() {
  const page = window.location.hash.slice(1);
  return ['home', 'plants', 'cart'].includes(page) ? page : 'home';
}

export default function App() {
  const [page, setPage] = useState(getPage);
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    const handleHashChange = () => setPage(getPage());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function navigate(destination) {
    window.location.hash = destination;
    setPage(destination);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" onClick={() => navigate('home')}>
          Paradise Nursery
        </a>
        <nav aria-label="Main navigation">
          <a href="#home" onClick={() => navigate('home')}>Home</a>
          <a href="#plants" onClick={() => navigate('plants')}>Plants</a>
          <a
            href="#cart"
            onClick={() => navigate('cart')}
            aria-label={`Cart, ${cartCount} items`}
          >
            <span aria-hidden="true">🛒</span> Cart
            <span className="cart-count">{cartCount}</span>
          </a>
        </nav>
      </header>

      {page === 'home' && (
        <main>
          <section className="hero">
            <div className="hero-content">
              <p>Welcome to Paradise Nursery</p>
              <h1>Bring Paradise Home</h1>
              <p>Discover beautiful houseplants for every space and lifestyle.</p>
              <button className="get-started-button" onClick={() => navigate('plants')}>
                Get Started
              </button>
            </div>
          </section>
          <AboutUs />
        </main>
      )}

      {page === 'plants' && <ProductList />}
      {page === 'cart' && (
        <CartItem onContinueShopping={() => navigate('plants')} />
      )}
    </>
  );
}
