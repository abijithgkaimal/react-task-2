import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Route, Routes } from 'react-router-dom'
import LandingPage from "./pages/LandingPage"
import Transaction from "./pages/Transaction"
import History from "./pages/History"
import Error from "./pages/Error"
import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {


  return (
    <>
      <Header />
      <Routes>

        
        <Route path='/' element={<LandingPage/>} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/history' element={<History />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/*' element={<Error />} />



      </Routes>
      <Footer />
    </>
  )
}

export default App
