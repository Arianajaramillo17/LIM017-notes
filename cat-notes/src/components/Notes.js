import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authInnerSystem";
import '../components/styles/Notes.css'

export function Notes() {

    const {user,logout, loading} = useAuth ()
    const navigate = useNavigate()
  
    const handleLogout = async () => {
      try {
      await logout()
      navigate('/Login');
    } catch (error) {
      console.error(error)
    }
  };
  
    if (loading) return <h1>loading</h1>
  
    return (
      <div className='Container-Header'>
      <div className='Content-HeaderInfo'>

      {<img className='logo-home'
                        src={require('../components/img/catlogo.png')}
                        alt='cat-logo' />}
       <h3>Hola,{user.displayName}</h3>
      {<img className='log-out-button' onClick={handleLogout}
                        src={require('../components/img/logout.png')}
                        alt='gmail-logo' />}
      </div>
      </div>
    );
  }
  export default Notes; 