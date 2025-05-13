import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import About from './pages/Aboutus'
import Membership from './pages/Membership'
import Minasidor from './pages/Mypages'
import News from './pages/News'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import './App.css'

function App() {
  

  return (
    <>
      <Router basename='/ETK-klubbsida'>
        <Navbar />
        <div className="min-h-screen flex flex-col">
        <Routes basename="/ETK-klubbsida">
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/Omoss" element={<About />}></Route>
          <Route path="/Medlemskap" element={<Membership />}></Route>     
          <Route path="/Minasidor" element={<Minasidor />}></Route>   
          <Route path="/Nyheter" element={<News />}></Route>
          <Route path="*" element={<h1 className="text-4xl p-5">404: Not Found</h1>}></Route>   
        </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App
