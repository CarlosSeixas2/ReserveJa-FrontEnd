import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Notfound from './pages/not-found'
import Register from './pages/register'
import Home from './pages/home'
import ReserveDetails from './pages/reserve-details'
import SolicitationDetails from './pages/solicitation-details'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/reserva/:classroomId" element={<ReserveDetails/>} />
      <Route path="/solicitar/:classroomId" element={<SolicitationDetails/>} />
      <Route path="*" element={<Notfound/>} />
    </Routes>
  )
}

export default App
