import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import ChatBot from './ChatBot'
import Home from './Home'
import UserProfile from './UserProfile'
import Login from './Login'
import Signup from './Signup'


const PrivateRoute = ({ children }) => {
  const islogin = localStorage.getItem('username')
  return islogin ? children : <Navigate to='/' />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home' element={<PrivateRoute>
          <Home />
        </PrivateRoute>} />
        <Route path='/chatbot' element={<PrivateRoute>
          <ChatBot/>
        </PrivateRoute>}/>
         <Route path='/profile' element={<PrivateRoute>
          <UserProfile/>
        </PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
