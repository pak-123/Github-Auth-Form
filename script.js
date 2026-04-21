import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCh5Ys1ANIC4iwmxuyYCg0CLtiN360qTso",
    authDomain: "auth-app-da5ec.firebaseapp.com",
    projectId: "auth-app-da5ec",
    storageBucket: "auth-app-da5ec.firebasestorage.app",
    messagingSenderId: "526487736970",
    appId: "1:526487736970:web:bae7f241fe074f362b1373",
    measurementId: "G-TP2J8SGKH1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const github = new GithubAuthProvider();

//   sign up with email and password 
document.getElementById("signup")?.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User Created:", userCredential.user);

            Swal.fire({
                title: "Signup Successful! 🎉",
                text: "Your account has been created successfully",
                icon: "success"
            }).then(() => {
                window.location.href = "welcome.html";
            });
        })
        .catch((err) => {
            console.log("Error:", err.code);

            let message = "Something Went Wrong";
            if (err.code === "auth/email-already-in-use") {
                message = "This email is already registered";
            }
            else if (err.code === "auth/invalid-email") {
                message = "Please enter a valid email";
            }
            else if (err.code === "auth/weak-password") {
                message = "Password should be at least 6 characters";
            }

            Swal.fire({
                title: "Signup Failed ❌",
                text: message,
                icon: "error",
            });
        });
});



// login with email and password

document.getElementById("login")?.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("SUCCESS:", userCredential.user);

            Swal.fire({
                title: "Login Successful!",
                text: "Welcome back 👋",
                icon: "success",
            }).then(() => {
                window.location.href = "welcome.html";
            });
        })
        .catch((err) => {
            console.log("ERROR:", err.code);

            Swal.fire({
                title: "Login Failed ❌",
                text: err.message,
                icon: "error"
            });
        });
});


// continue with google 

document.getElementById("google-auth")?.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("User:", result.user);

            Swal.fire({
                title: "Login Successful! 🎉",
                text: "Signed in with Google",
                icon: "success"
            }).then(() => {
                window.location.href = "welcome.html";
            });
        })
        .catch((err) => {
            console.log("Error:", err.code);

            let message = "Google login failed";

            if (err.code === "auth/popup-closed-by-user") {
                message = "Popup closed before login";
            }
            else if (err.code === "auth/cancelled-popup-request") {
                message = "Login cancelled";
            }
            else if (err.code === "auth/popup-blocked") {
                message = "Popup blocked by browser";
            }

            Swal.fire({
                title: "Error ❌",
                text: message,
                icon: "error"
            });
        });
});

// Continue with github 
document.getElementById("github-auth")?.addEventListener("click", () => {
    signInWithPopup(auth, github)
        .then((result) => {
            console.log("User:", result.user);

            Swal.fire({
                title: "Login with Github Successful! 🎉",
                text: "Signed in with Github",
                icon: "success"
            }).then(() => {
                window.location.href = "welcome.html";
            });
        })
        .catch((err) => {
            console.log("Error:", err.code);

            let message = "Google login failed";

            if (err.code === "auth/popup-closed-by-user") {
                message = "Popup closed before login";
            }
            else if (err.code === "auth/cancelled-popup-request") {
                message = "Login cancelled";
            }
            else if (err.code === "auth/popup-blocked") {
                message = "Popup blocked by browser";
            }

            Swal.fire({
                title: "Error ❌",
                text: message,
                icon: "error"
            });
        });
});



// Logout

document.getElementById("logoutbtn")?.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            Swal.fire({
                title: "Logged Out Successfully 👋",
                text: "You have been safely logged out. See you again soon!",
                icon: "success"
            }).then(() => {
                window.location.href = "index.html";
            })
        })
        .catch((err) => {
            console.log(err);

            Swal.fire({
                title: "Error ❌",
                text: "Logout failed",
                icon: "error"
            });
        });
})