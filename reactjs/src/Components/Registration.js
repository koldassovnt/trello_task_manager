import Container from 'react-bootstrap/Container';
import React, { useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';


import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';



function Registration(params) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [fullName, setFullName] = useState("");

    const [message, setMessage] = useState("");

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleFullNameChange = event =>{
        setFullName(event.target.value);
    }

    const handlePasswordConfirmChange = event =>{
        setPasswordConfirm(event.target.value);
    }

    const handleSubmit = event =>{
        const inputData = {email, password, passwordConfirm ,fullName};
        registration(inputData);
        event.preventDefault();

        if (message == "BAD_REQUEST") {
            window.location.replace("/register");
        } else {
            window.location.replace("/login");
        }
    }

    async function registration(data){
        
        const response = await fetch("http://localhost:8080/register", {
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

        if(response.status === 400){
            setMessage("BAD_REQUEST");
            console.log(message);
        }

    }

    return (
        <Container className="mt-4">
            
            <MDBContainer>
            <MDBRow>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="6">
                <form onSubmit={handleSubmit}>
                    <p className="h5 text-center mb-4">Sign up</p>
                    <div className="grey-text">
                    <MDBInput label="Your full name" icon="user" group type="text" validate error="wrong"
                        success="right" value = {fullName} onChange = {handleFullNameChange}/>
                    <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                        success="right" value = {email} onChange = {handleEmailChange}/>
                    <MDBInput label="Your password" icon="lock" group type="password" validate 
                    value = {password} onChange = {handlePasswordChange}/>
                    <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="password" validate
                        error="wrong" success="right" value = {passwordConfirm} onChange = {handlePasswordConfirmChange}/>
                    </div>
                    <div className="text-center">
                    <Button type="submit" className="btn btn-primary btn-md">Register</Button>
                    </div>
                </form>
                </MDBCol>
                <MDBCol md="3"></MDBCol>
            </MDBRow>
            </MDBContainer>

        </Container>
    );
}

export default Registration;