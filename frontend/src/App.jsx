import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalogue from './pages/CatalogoProdotti'
import About from './pages/About'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import Prodotto from './pages/Prodotto'
import ProductItem from './components/ProductItem'

const App = () => {
  return (
    <div className='px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalogo' element={<Catalogue />} />
        <Route path='/about' element={<About />} />
        <Route path='/product/:productId' element={<ProductItem />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
