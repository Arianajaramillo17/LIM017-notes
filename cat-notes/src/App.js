import { Routes, Route } from 'react-router-dom';
import {Home} from './components/Home'
import {Login} from './components/Login'
import { ProtectRoute } from './components/ProtectRoute';
import {Register} from './components/Register'
import { AuthProvider } from './context/authInnerSystem';

function App() {
  return (
    <div>
    <AuthProvider>
      <Routes>
      <Route path="/" element={ 
      <ProtectRoute>
      <Home/>
      </ProtectRoute>
      }
      />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>} component={Register} />
    </Routes>
    </AuthProvider>
    </div>
  );
}
export default App;





