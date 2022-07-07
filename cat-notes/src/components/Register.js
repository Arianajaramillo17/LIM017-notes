import { useState } from "react";
import { useAuth } from "../context/authInnerSystem";
import { useNavigate } from "react-router-dom";
import '../components/styles/Register.css'

export function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        displayName:'',
    });
    const { signup } = useAuth();

    const navigate = useNavigate();

    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(user.email, user.password, user.displayName);
            navigate("/Login")
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <body >
        <div className="registerview">
            
                <header>
            {<img className='logo-register'
                    src={require('../components/img/catlogo.png')}
                    alt='cat-logo' />}
            {error && <p>{error}</p>}
            <p className="title"> Registrate</p>
            </header>
            <div className="distribution-register">
            <form onSubmit={handleSubmit}>
            <label htmlFor="">Nombre</label>
                <input type="" name="displayName" placeholder="Nombre de usuario" onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="youremail@example.com" onChange={handleChange} />

                <label htmlFor="password"> Password</label>
                <input type="password" name="password" id="password" placeholder="******" onChange={handleChange} />
                <button>Register</button>
            </form>
            </div>
        </div>
        </body>
    )
};