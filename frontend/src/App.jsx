import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Login from '@/pages/Login'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import Product from '@/pages/Product'
import Checkout from '@/pages/Checkout'
import Portfolio from '@/pages/Portfolio'
import Contact from '@/pages/Contact'
import Privacy from '@/pages/Privacy'
import CartSheet from '@/components/cart/CartSheet'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import ProductForm from '@/pages/admin/ProductForm'

import ScrollToTop from '@/components/utils/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-background text-primary selection:bg-white/20">
        <CartSheet />
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products/new" element={<ProductForm />} />
            <Route path="/admin/products/edit/:id" element={<ProductForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
