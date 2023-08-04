import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Register from './components/Register'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
