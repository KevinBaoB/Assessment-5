
import axios from 'axios'
import AppNav from '../components/AppNav'
import Carousel from 'react-bootstrap/Carousel';
import GIF from '../assets/output-onlinegiftools.gif';
import { Container, Row, Col } from 'react-bootstrap'

const HomePage = ({navItems}) => {
    return (
        <div>
            <AppNav navItems={navItems}/>
            <Container fluid>
                
                <Row className="banner firstColor">
                    <Col sm={4}>
                    <img
                        className="d-block"
                        src={GIF}
                        alt="Second slide"
                        />
                    </Col>
                    <Col >
                        <div >
                            "Live Clean,"
                            <br/>
                            "Clean Right,"
                            <br/>
                            "Use Correct Solutions"
                        </div>
                    </Col>
                    
                </Row>
                <Row>
                <Carousel variant='blue'>
                    <Carousel.Item interval={1000}>
                        <Carousel.Caption>
                        <h3>Be equipped with the right cleaning solutions</h3>
                        <p>Having the right tools and solutions will prolong your item life.</p>
                        </Carousel.Caption>
                        <img
                        className="d-block"
                        src="https://pbs.twimg.com/media/BdFHPQKIEAADinp.png:large"
                        alt="First slide"
                        />
                        
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <Carousel.Caption>
                        <h3>Cleaning Right will help reduce build-up</h3>
                        <p>Keep your health up with a clean enviroment.</p>
                        </Carousel.Caption>
                        <img
                        className="d-block"
                        src="https://images.gr-assets.com/hostedimages/1621593196ra/31364427.gif"
                        alt="Second slide"
                        />
                        
                    </Carousel.Item>
                    <Carousel.Item>
                        
                        <img
                        className="d-block"
                        src='https://y.yarn.co/5ecd7b39-5539-405b-a1e1-acaccbcf5e87_text.gif'
                        alt="Third slide"
                        />
                        
                    </Carousel.Item>
                </Carousel>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;