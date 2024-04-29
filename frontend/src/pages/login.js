import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect} from "react";
import { Container, Form, FormFeedback, FormGroup,
       FormText, Label, Input, Button } from "reactstrap";
import './login.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/UserContext.js";
import Header from "../components/Header.js";


function Login(props) {
    let navigate = useNavigate();
    let auth = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showSignUp, setShowsignup] = useState(false);
    const [res, setRes] = useState(null);
    const [touched, setTouched] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [loggedInID, setLoggedInID] = useState(false);
    
    const {user, setUser, isLoggedIn, setIsLoggedIn, login, register} = useAuth();

    // TODO: Change back to 8
    const tooShort = password.length < 4;
    let notMatching = false;
    if (password !== confirmPassword) {
        notMatching = true;
    }


    const handleBlur = () => setTouched(true);

    
    function handleLogin(e) {
        e.preventDefault();
        // props.toggle();
    }

    function handlesignup() {
        // setShowsignup(!showSignUp);
        navigate('/signup');
    }

    function loginuser() {
        login(username, password);

    }

    return (
        <div>
        <div>
            <Header  />
        </div>
        <Container className="popup">
            
            {/* {isLoggedIn ? (<span>Username: {user} </span>) : null} */}
            <div className="popup-inner">
                
                    <Form onSubmit={handleLogin}>
                    <h2>Login</h2>

                        <Label>
                            Username:
                            <Input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </Label>
                        <Label>
                            Password:
                            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Label>
                        <span onClick={handlesignup} style={{ display: 'block', cursor: 'pointer', textDecoration: 'underline' }}>Don't have an account? Sign up here</span>
                        <Button onClick={loginuser} type="submit">Login</Button>
                    </Form>
                <button type="close" onClick={props.toggle}>Close</button>
                
            </div>
        </Container>
    </div>
    )
}
export default Login