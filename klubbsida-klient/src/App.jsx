import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import About from './pages/Aboutus'
import Membership from './pages/Membership'
import Minasidor from './pages/Mypages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <div class="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/Omoss" element={<About />}></Route>
          <Route path="/Medlemskap" element={<Membership />}></Route>     
          <Route path="/Minasidor" element={<Minasidor />}></Route>      
        </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App
