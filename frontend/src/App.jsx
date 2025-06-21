import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Signup from './signup'
import Login from './login'
import Home from './home'
import ChatBot from './ChatBot'


const PrivateRoute = ({ children }) => {
  const islogin = localStorage.getItem('username')
  return islogin ? children : <Navigate to='/' />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute>
          <Home />
        </PrivateRoute>} />
        <Route path='/chatbot' element={<PrivateRoute>
          <ChatBot/>
        </PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
