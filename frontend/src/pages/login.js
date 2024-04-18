import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Container } from "reactstrap";
import './login.css';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function handleLogin(e) {
        e.preventDefault();
        props.toggle();
    }

    return (
        <Container className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e =>setUsername(e.target.value)} />
                    </label>
                    <label>
                        password:
                        <input type="text" value={password} onChange={e =>setUsername(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <button type="close" onClick={props.toggle}>Close</button>
            </div>
        </Container>
    )

}
export default Login