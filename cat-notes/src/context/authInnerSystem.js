import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from "../firebase";
//import { setUser } from "firebase/analytics";
export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is not auth provider");
    return context
};

export const signup = async (email, password, displayName) =>
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, { displayName });
            });
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const logout = () => signOut(auth);

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);
    return (
        <authContext.Provider value={{ user, logout, loading, loginWithGoogle }} >
            {children}</authContext.Provider>
    );
};
export default AuthProvider;