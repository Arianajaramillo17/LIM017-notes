//import { useContext } from "react";
import {useAuth} from "../context/authInnerSystem";

export function Home() {
    const {user, logout,loading} = useAuth();

    const handleLogout= async () =>{
        await logout();

    };
    if (loading) return <h1>loading</h1>
    return(
        <div>
            <h1>Welcome {user.displayName}</h1>
            <button onClick={handleLogout} >logout</button>
        </div>
    );
    
}