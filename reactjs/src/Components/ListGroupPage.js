import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

const ListGroupPage = () => {
return (
<MDBContainer>
  <MDBListGroup>
    <MDBListGroupItem active href="#">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">List group item heading</h5>
      </div>
      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</p>
    </MDBListGroupItem>
    <MDBListGroupItem hover href="#">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">List group item heading</h5>
      </div>
      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</p>
    </MDBListGroupItem>
    <MDBListGroupItem hover href="#">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">List group item heading</h5>
      </div>
      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</p>
    </MDBListGroupItem>
  </MDBListGroup>
</MDBContainer>
);
};

export default ListGroupPage;