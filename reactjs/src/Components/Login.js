import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';


function Login(params) {

    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleSubmit = event =>{
        event.preventDefault();
        const inputData = {email, password};
        auth(inputData);
        
        // window.location.replace("/allcards");
        
    }

    async function auth(data){
        const response = await fetch("http://localhost:8080/auth", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
          });

        if(response.status === 200){
            let jwt = await response.json();
            setCookieJWT('jwt', jwt);
        }
    }

    return (
        <Container className="mt-4">
            <MDBContainer>
            <MDBRow>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="6">
                <form onSubmit={handleSubmit}>
                    <p className="h5 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                    <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                        success="right"  value = {email} onChange = {handleEmailChange}/>
                    <MDBInput label="Type your password" icon="lock" group type="password" validate value = {password} onChange = {handlePasswordChange}/>
                    </div>
                    <div className="text-center">
                    <Button type="submit" className="btn btn-primary btn-md">Login</Button>
                    </div>
                </form>
                </MDBCol>
                <MDBCol md="3"></MDBCol>
            </MDBRow>
            </MDBContainer>
        </Container>
    );
}

export default Login;