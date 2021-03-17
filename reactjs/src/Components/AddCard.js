import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';


function AddCard() {

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
  
    const handleNameChange = event =>{
      setName(event.target.value);
    }
  
    const handleSubmit = event =>{
      const inputData = {name}
      addItem(inputData);
      setName("");

      window.location.href="/allcards";
    }
  
    async function addItem(data){
      const response = await fetch("http://localhost:8080/api/addcard", {
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
      let messData = await response.json();
      setMessage(messData.id? "Data Added : " : "Error");
      console.log(messData);
    }
  
    return (
      <Container className="mt-4 mb-4" style={{width: '520px'}}>
        <Card>
          <Card.Body>
          <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group mb-2 mt-4">
                    <input type="text" className="form-control" name="name" placeholder="Create new card" value = {name} onChange = {handleNameChange}/>
                </Form.Group>              
                <Form.Group className="mt-3">
                    <Button type="submit" className="btn btn-primary btn-md">Add New +</Button>
                </Form.Group>
              </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }


  export default AddCard;