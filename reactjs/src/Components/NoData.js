import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';



function NoData() {
    return(
        <Container>
            <div className="no-result">
                <h2>Results not found</h2>
                <Image src="https://www.flaticon.com/svg/vstatic/svg/12/12572.svg?token=exp=1616000720~hmac=17e23c9abc7eaa1a5acde04dba19d6c2" roundedCircle />
            </div> 
        </Container>
    );
}

export default NoData;