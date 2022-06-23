import { useState } from "react";
import { useAuth } from "../context/authInnerSystem";
import { useNavigate } from "react-router-dom";
export function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const { login, loginWithGoogle } = useAuth();
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
        try {
            await login(user.email, user.password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        };


    }
    return (
        <section className="loginview">
            <div>
                {<img className='logo'
                    src={require('../components/img/catlogo.png')}
                    alt='cat-logo' />}

                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div ></div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="youremail@example.com"
                        id="inline-full-name"
                        onChange={handleChange} />

                    <label htmlFor="password"> Password</label>
                    <input type="password"
                        name="password"
                        id="password"
                        placeholder='******'
                        onChange={handleChange} />
                    <button>Login</button>
                </form>
                <button onClick={handleGoogleSignin}>login with google</button>
                <button>Registrarme </button>
            </div>
        </section>
    )
};