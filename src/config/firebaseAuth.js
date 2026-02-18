import axios from "axios";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";



const GoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const token = await user.getIdToken();

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token);
        // localStorage.setItem('token', user.accessToken)

        await axios.post(`https://hercyclebloom.vercel.app/user/google-signin`, {
            email: user.email,
            name: user.displayName,
            uid: user.uid,
            photo: user.photoURL
        })

        return {
            status: true,
            message: "Account created successfully",
            user,
        }
    } catch (error) {
        console.error("Error signing in:", error);

        return {
            status: false,
            message: "Something went wrong, try again",
        }
    }

}

export { GoogleSignIn }