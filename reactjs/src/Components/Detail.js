import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
  } from "react-router-dom";


  function ListTasks() {
    let { id } = useParams();
    const [data, setData] = useState([]);

    async function loadData() {
        let response = await fetch("http://localhost:8080/api/cardtasks/" + id);
        let tableData = await response.json();
        console.log(tableData);
        setData(tableData);
      }

      async function updateTask(taskid){
        const response = await fetch("http://localhost:8080/api/updateTask/" + taskid, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json"
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });

        window.location.href="/detail/" + id;
      }
    
      useEffect(() => {
        loadData();
      }, []);

      return (
          <Container className="mt-4">
              {data?.map(task=>(
                  <Card key={task.id} border="info" className="mt-2">
                  <Card.Body>
                    <Card.Title>{task.taskText}</Card.Title>
                    <Card.Text>
                      {task.addedDate}
                    </Card.Text>
                    <hr/>
                    {task.done ? (   
                      <Button type="submit" className="m-2 btn-md" variant="primary" onClick={() =>updateTask(task.id)}>UNDO</Button>
                    ) : (
                      <Button type="submit" className="m-2 btn-md" variant="success" onClick={() =>updateTask(task.id)}>Done</Button>                    
                    )}
                  </Card.Body>
                  </Card>
              ))}
          </Container>
      );
}


function AddTask() {
    let { id } = useParams();
  
    const [taskText, setTaskText] = useState("");
    const [message, setMessage] = useState("");
  
    const handleTextChange = event =>{
      setTaskText(event.target.value);
    }
  
    const handleSubmit = event =>{
      const inputData = {taskText}
      addItem(inputData);
      setTaskText("");
    }
  
    async function addItem(data){
      const response = await fetch("http://localhost:8080/api/detail/" + id, {
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
      <Container className="mt-4">
      <Card border="dark">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="form-group mb-2 mt-4">
              <input type="text" className="form-control" name="name" placeholder="Create new card" value = {taskText} onChange = {handleTextChange}/>
          </Form.Group>              
          <Form.Group className="mt-3">
              <Button type="submit" className="btn btn-secondary btn-md">Add New Task +</Button>
          </Form.Group>
        </Form>
      </Card.Body>
      </Card>
    </Container>
    );
  
  }



function Detail() {
    let { id } = useParams();
    const [obj, setData] = useState(Object);

    const history = useHistory()

    const handleDelete = event =>{
        deleteItem();
        window.location.href="/allcards";
      }

      async function deleteItem(){
        const response = await fetch("http://localhost:8080/api/deletecard/" + id, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json"
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
      }
  
    async function loadData() {
      let response = await fetch("http://localhost:8080/api/detail/" + id);
      let tableData = await response.json();
      console.log(tableData);
      setData(tableData);
    }
  
    useEffect(() => {
      loadData();
    }, []);
  
    return (
        <div>
        <Container className="mt-4">
            <Card bg="info" text="white" >
            <Card.Body>
            <Card.Title>{obj.name}</Card.Title>
            <Card.Text text="white">
                {obj.addedDate}
            </Card.Text>
            
            </Card.Body>
            <Card.Footer>
            <Button className="m-2 btn-md" variant="success">Edit</Button>
            <Button className="m-2 btn-md" variant="danger" onClick={handleDelete}>Delete</Button>
            </Card.Footer>
            </Card>
        </Container>
        <AddTask/>
        <ListTasks/>

      </div>
    );
  }
  

  export default Detail;
