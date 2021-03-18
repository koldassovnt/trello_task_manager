import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import React, { useState, useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';


function Profile(props) {

    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const isLogged = props.isLogged;
    const[user, setUser] = useState(Object);
    const [message, setMessage] = useState("");

    const [fullName, setFullName] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleFullNameChange = event =>{
        setFullName(event.target.value);
    }

    const handleOldPasswordChange = event =>{
        setOldPassword(event.target.value);
    }

    const handleNewPasswordChange = event =>{
        setNewPassword(event.target.value);
    }

    const handlePasswordConfirmChange = event =>{
        setPasswordConfirm(event.target.value);
    }

    const handlePasswordUpdate = event =>{
        const inputData = {oldPassword, newPassword, passwordConfirm};
        updatePassword(inputData);
    }

    const handleProfileUpdate = event =>{
        const inputData = {fullName};
        console.log(inputData);
        updateName(inputData);
    }

    async function updatePassword(data){

        const bearer = "Bearer "+ cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8080/api/editPassword", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        
        if(response.status !== 200){
            setMessage("BAD_REQUEST");
            console.log(message);
        }
    }


    async function updateName(data){

        const bearer = "Bearer "+ cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8080/api/updateName", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        
        if(response.status !== 200){
            setMessage("BAD_REQUEST");
            console.log(message);
        }
    }

    async function getUser(){
        if (isLogged) {
        
          const bearer = "Bearer "+ cookieJWT['jwt'].jwtToken;
    
          const response = await fetch("http://localhost:8080/api/profile", {
              method:'GET',
              headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
              }
          });
          
          if(response.status === 200){
              let res = await response.json();
              console.log(res);
              setUser(res);
          }
        }
      }
    
      useEffect(() => {
        getUser();
      }, []);


    return (
        <Container className="mt-4">
            <Container>
            <MDBContainer>
            <MDBRow>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="6">
                <form onSubmit={handleProfileUpdate}>
                    <p className="h5 text-center mb-4">Update Profile Data</p>
                    <div className="grey-text">
                    <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                        success="right"  value = {user.email} readOnly/>
                    <MDBInput label={user.fullName} icon="user" group type="text" validate error="wrong"
                        success="right" value = {fullName} onChange = {handleFullNameChange}/>
                    </div>
                    <div>
                    <Button type="submit" className="btn btn-primary btn-md">Update Profile</Button>
                    </div>
                </form>
                </MDBCol>
                <MDBCol md="3"></MDBCol>
            </MDBRow>
            </MDBContainer>
            </Container>

            <Container className="mt-4">
            <MDBContainer>
            <MDBRow>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="6">
                <form onSubmit={handlePasswordUpdate}>
                    <p className="h5 text-center mb-4">Update Profile Data</p>
                    <div className="grey-text">
                    <MDBInput label="Old Password" icon="lock" group type="password" validate 
                    value = {oldPassword} onChange = {handleOldPasswordChange}/>
                    <MDBInput label="New Password" icon="lock" group type="password" validate 
                    value = {newPassword} onChange = {handleNewPasswordChange}/>
                    <MDBInput label="Repeat New Password" icon="lock" group type="password" validate 
                    value = {passwordConfirm} onChange = {handlePasswordConfirmChange}/>
                    </div>
                    <div>
                    <Button type="submit" className="btn btn-primary btn-md">Update Password</Button>
                    </div>
                </form>
                </MDBCol>
                <MDBCol md="3"></MDBCol>
            </MDBRow>
            </MDBContainer>
            </Container>
        </Container>
    );
}

export default Profile;