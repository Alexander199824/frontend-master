import './App.css';
import Navbar from './Componets/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSingup from './Pages/LoginSingup';
import Footer from './Componets/Footer/Footer';
import men_banner from './Componets/Assets/banner_mens.png';
import women_banner from './Componets/Assets/banner_women.png';
import kid_banner from './Componets/Assets/banner_kids.png';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// URL del backend
export const BACK_URL = 'https://backend-it3p.onrender.com';

// Inicialización de Stripe
const stripePromise = loadStripe("pk_test_51Q9AE9RuJGGo3YowmggUtXtmqutHIYzl73ESNvM91kyz34Rp3e33rZcC4eJWObQzSKJhIQh85jHlCkk7YuBiej0O00wuXlgYsz"); 

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
            <Route path='/product' element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSingup />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </Elements>
  );
}

export default App;
