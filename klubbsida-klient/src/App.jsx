import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import About from './pages/Aboutus'
import Prices from './pages/Prices'
import Minasidor from './pages/Mypages'
import News from './pages/News'
import ArticlePage from './pages/ArticlePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


import 'aos/dist/aos.css';
import './App.css'

function App() {
  

  return (
    <>
      <Router>
        <Navbar />
        <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/Omoss" element={<About />}></Route>
          <Route path="/Priser" element={<Prices />}></Route>     
          <Route path="/Minasidor" element={<Minasidor />}></Route>   
          <Route path="/Nyheter" element={<News />}></Route>
          <Route path="/Artikel/:id" element={<ArticlePage />}></Route>
          {/* Add more routes as needed */}
          {/* 404 Not Found Route */}
          <Route path="*" element={<h1 className="text-4xl p-5">404: Not Found</h1>}></Route>   
        </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App
