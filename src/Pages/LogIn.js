import React, { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyB3KDYZqFp4GaG-jP-FV9ZTDnOucTHMLtw",
    authDomain: "somethingnew-89101.firebaseapp.com",
    projectId: "somethingnew-89101",
    storageBucket: "somethingnew-89101.appspot.com",
    messagingSenderId: "1051568710393",
    appId: "1:1051568710393:web:18b0301bee7328972e7828",
    measurementId: "G-B21WENM8C3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')
        } else {
            setIsLoggedIn(true);
            navigate('/');
        }
    }, [navigate])

    useEffect(() => {
        if (!isLoggedIn) {
            const uiConfig = {
                signInSuccessUrl: './',
                signInOptions: [
                    GoogleAuthProvider.PROVIDER_ID,
                    EmailAuthProvider.PROVIDER_ID,
                ],
            };

            setTimeout(() => {
                const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
                ui.start('#firebaseui-auth-container', uiConfig);
            }, 0);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken().then((token) => {
                    localStorage.setItem('token', token);
                    setTimeout(() => {
                        auth.signOut().then(() => {
                            localStorage.removeItem('token');
                            navigate('/login');
                        });
                    }, 1000);
                });
                
                const intervalId = setInterval(() => {
                    user.getIdTokenResult(true)
                        .then((idTokenResult) => {
                        })
                        .catch((error) => {
                            console.error(error);
                            if (error.code === 'auth/user-not-found') {
                                localStorage.removeItem('token');
                                navigate('/login');
                            }
                        });
                }, 1000); 

                return () => clearInterval(intervalId);
            } else {
                localStorage.removeItem('token');
            }
        });

        return unsubscribe;
    }, [navigate]);
    
    
    return (
        <div style={styles.container}>
            <div style={styles.LoginPage}>
                <h1 style={styles.LoginPageLogin}>Login into the site</h1>
                <div id="firebaseui-auth-container"></div>
            </div>
        </div>
    );
};

const styles = {
    container: {
    backgroundImage: 'url("https://wallpapers.com/images/hd/black-gradient-background-pv1chy1f74953f5z.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
      alignItems: 'center',
    },
    LoginPageLogin:{
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
        alignItems: 'center',
        alignContent: 'center',
        alignText: 'center',
        TextMetrics: { font: 'bold, italic 100 % sans', fontSize: '100%' }
    }
}

export default Login;
