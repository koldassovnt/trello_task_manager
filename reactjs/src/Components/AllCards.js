import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';

import AddCard from './AddCard';
import NoData from './NoData';

import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";


function AllCards() {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filterCards, setFilteredCards] = useState([]);
    
  
    async function loadData() {
      let response = await fetch("http://localhost:8080/api/allcards");
      let tableData = await response.json();
      setData(tableData);
    }
  
    useEffect(() => {
      loadData();
    }, []);

    useEffect(() => {
        setFilteredCards(
            data.filter(card => {
                return card.name.toLowerCase().includes(search.toLowerCase())
            })
        )
    }, [search, data])

    

    return(
        <Container className="search-container">
            <Container className="mt-4 ">
            <MDBCol>
                <MDBFormInline className="md-form">
                    <MDBIcon icon="search" />
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)}/>
                </MDBFormInline>
                <h3>Search result for: {search}</h3>
            </MDBCol>
            </Container>

            <Container>
                <AddCard/>
            </Container>
        
            
            {filterCards.length > 0 ? (
                <Container className="card-container">
                    {filterCards?.map(card=>(
                        <Card className="m-4 carditem" key={card.id}>
                        <Card.Body>
                            <Card.Title>{card.name}</Card.Title>
                            <Card.Link className="card-link" href={"/detail/" + card.id}>Details</Card.Link>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">{card.addedDate}</small>
                        </Card.Footer>
                        </Card>
                    
                ))}</Container>
            ) : (
                <NoData/>
            )}
        
      </Container>
    );

}

export default AllCards;