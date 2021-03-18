import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

const ListGroupPage = () => {
return (
<MDBContainer>
  <MDBListGroup>
    <MDBListGroupItem hover href="#">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">Quick Access</h5>
      </div>
      <p className="mb-1">Fast and easy</p>
    </MDBListGroupItem>
    <MDBListGroupItem hover href="#">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">Great Management</h5>
      </div>
      <p className="mb-1">Grouping your tasks</p>
    </MDBListGroupItem>
    <MDBListGroupItem hover href="#">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">Statistics</h5>
      </div>
      <p className="mb-1">Monitoring with your success</p>
    </MDBListGroupItem>
    <MDBListGroupItem hover href="#">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">Cloud Service</h5>
      </div>
      <p className="mb-1">Store your data in cloud</p>
    </MDBListGroupItem>
  </MDBListGroup>
</MDBContainer>
);
};

export default ListGroupPage;