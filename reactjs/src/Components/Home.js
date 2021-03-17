import Container from 'react-bootstrap/Container';

import CarouselPage from './CarouselPage';
import ListGroupPage from './ListGroupPage';

function Home(params) {

    return (
        <Container className="mt-4">
            <Container>
                <CarouselPage/>
            </Container>

            <Container className="mt-4">
                <ListGroupPage/>
            </Container>    
        </Container>
    );
}

export default Home;