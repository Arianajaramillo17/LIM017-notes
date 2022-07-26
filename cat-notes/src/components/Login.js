import { useState } from "react";
import { login,loginWithGoogle } from "../context/authInnerSystem";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import '../components/styles/Login.css'

export function Login() {

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password')
        }
    };

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
  
    const navigate = useNavigate();

    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value });

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const homeUser = await login(user.email, user.password);
            localStorage.setItem('email', homeUser.user.email);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (

        <div className="loginview" id="loginview">
            <div className="distribution-login">
                {<img className='logo'
                    src={require('../components/img/catlogo.png')}
                    alt='cat-logo' />}

                {error && <p>{error}</p>}
                <form className="formLogin" onSubmit={handleSubmit}>
                  
                    
                    <label htmlFor="inline-full-name" className="emailLabel" >Correo</label>
                    <br></br>
                    <input
                        type="email"
                        name="email"
                        placeholder="youremail@example.com"
                        id="inline-full-name"
                        className="emailLogin"
                        onChange={handleChange} />
                    <br></br>
                    <label htmlFor="password"> Contraseña</label>
                    <span className="eye" onClick={handleToggle} style={{ color: 'gray' }}><Icon icon={icon} size={35} /></span>
                    <input type={type}
                        name="password"
                        id="password"
                        className="passwordLogin"
                        placeholder='******'
                        onChange={handleChange} />

                    <button className="buttonLogin">Iniciar sesión</button>

                    <p className="loginSeparation">----------------o----------------</p>
                    {<img className='gmailLogo' onClick={handleGoogleSignin}
                        src={require('../components/img/gmail-button.png')}
                        alt='gmail-logo' />}

                    <div className='bottom'>
                        <p className="questionLogin">¿No tienes cuenta?</p>
                        <Link className="register" to={'/Register'} >Registrarse</Link></div>
                </form>

            </div>
        </div>

    )
};
export default Login;