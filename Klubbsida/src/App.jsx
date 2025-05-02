import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Membership from './pages/Membership'
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
          <Route path="/About" element={<About />}></Route>
          <Route path="/Membership" element={<Membership />}></Route>        
        </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App
