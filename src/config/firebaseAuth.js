import axios from "axios";
import { auth, provider, appleProvider } from "./firebase.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";



const GoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', user.accessToken)

        await axios.post('https://her-cycle-bloom-backend.onrender.com/user/google-signin', {
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

const AppleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, appleProvider);
        const user = result.user;
        "https://her-cycle-bloom-1e43d.firebaseapp.com/__/auth/handler"

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', user.accessToken)

        await axios.post('https://her-cycle-bloom-backend.onrender.com/user/apple-signin', {
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
        console.error("Error signing in with Apple:", error);

        return {
            status: false,
            message: "Something went wrong, try again",
        }
    }

}

//   const handleSignOut = async () => {
//         try {
//             await signOut(auth);
//             console.log("User signed out successfully");
//         } catch (error) {
//             console.error("Error signing out:", error);
//         }
//     };

export default GoogleSignIn


