import { useState } from "react";
import { signup} from "../context/authInnerSystem";
import { useNavigate } from "react-router-dom";
import '../components/styles/Register.css'

export function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        displayName: '',
    });
    //const { signup } = useAuth();

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

                <header className="header-register">
                    {<img className='logo-register'
                        src={require('../components/img/catlogo.png')}
                        alt='cat-logo' />}
                    {error && <p>{error}</p>}
                    <p className="title"> Regístrate</p>
                </header>
                <div className="distribution-register">
                    <form className="distribution-forms"  onSubmit={handleSubmit}>
                        <p className="mane-register-label">Nombre</p>
                        <br></br>
                        <input  className="inputregis user-name-register" type="" name="displayName" placeholder="Nombre de usuario" onChange={handleChange} />
                        <br></br>
                        <p htmlFor="email" className="email-register-label">Correo</p>
                        <br></br>
                        <input className=" inputregis user-email-register" type="email" name="email" placeholder="youremail@example.com" onChange={handleChange} />
                        <br></br>
                        <p htmlFor="password" className="   password-register-label"> Contraseña</p>
                        <br></br>
                        <input type="password" className="inputregis user-password-register" name="password" id="password" placeholder="******" onChange={handleChange} />
                        <br></br>
                        <button className="botton-register">Crear cuenta</button>
                    </form>
                </div>
               
            </div>
            {<img className='cute-paw'  src={require('../components/img/cutepaw.png')}
                        alt='ca-paw' />}
        </body>
    )
};
export default Register;