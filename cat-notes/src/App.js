import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home'
import { Notes } from './components/Notes';
import { Login } from './components/Login'
import { ProtectRoute } from './components/ProtectRoute';
import { Register } from './components/Register'
import { AuthProvider } from './context/authInnerSystem';
import React from 'react';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/' element={<ProtectRoute>  <Notes /> <Home /> </ProtectRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
export default App;





