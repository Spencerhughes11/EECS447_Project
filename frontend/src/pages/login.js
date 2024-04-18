import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Container } from "reactstrap";
import './login.css';
import { useHref } from "react-router-dom";

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showSignUp, setShowsignup] = useState(false);

    function handleLogin(e) {
        e.preventDefault();
        props.toggle();
    }

    function handlesignup() {
        setShowsignup(!showSignUp);
        
    }

    function registeruser(user) {
        // create new user in the user table

        
    }

    function loginuser(user) {
        // authenticate user 
    }

    return (
        <Container className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                {showSignUp ? (
                    <form onSubmit={handleLogin}>
                        <label>
                            Create Username:
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </label>
                        <label>
                            Create Password:
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                        <label>
                            Confirm Password:
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                        <span onClick={handlesignup} style={{ display: 'block', cursor: 'pointer', textDecoration: 'underline' }}>Have an account? Log in here</span>
                        <button onClick={registeruser} type="submit">Sign Up</button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <label>
                            Username:
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                        <span onClick={handlesignup} style={{ display: 'block', cursor: 'pointer', textDecoration: 'underline' }}>Don't have an account? Sign up here</span>
                        <button onClick={loginuser} type="submit">Login</button>
                    </form>
                )}
                <button type="close" onClick={props.toggle}>Close</button>
                
            </div>
        </Container>
    )

}
export default Login