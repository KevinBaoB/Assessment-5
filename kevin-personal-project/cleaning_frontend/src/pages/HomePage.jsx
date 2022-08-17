
import axios from 'axios'
import AppNav from '../components/AppNav'
import Carousel from 'react-bootstrap/Carousel';
import cleaning_squid from '../assets/output-onlinegiftools.gif';
import squiward_being_cleaned from '../assets/squidward.gif'
import spongebob_crazy from '../assets/spongebob_crazy.gif'
import { Container, Row, Col } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';

const HomePage = ({navItems}) => {

    const [sadGif, setSadGif] = useState([])
    const [cleaningGif, setCleaningGif] = useState([])

    const getRandomNum = () => {
        let randomNum = Math.floor(Math.random() * 20)
        return randomNum
    }

    console.log(getRandomNum())

    const getSadGiphy = async() => {
        const query = 'sad spongebob'
        const response = await axios.get(`/get_giphy/${query}/`)
        console.log('sad')
        let sadGif = response.data.data[getRandomNum()]['images']['downsized']['url']
        console.log(sadGif)
        setSadGif(sadGif)
    }

    const getCleaningGiphy = async() => {
        const query = 'spongebob cleaning'
        const response = await axios.get(`/get_giphy/${query}`)
        console.log('clean')
        let cleaningGif = response.data.data[getRandomNum()]['images']['downsized']['url']
        console.log(cleaningGif)
        setCleaningGif(cleaningGif)
    }

    useEffect(() => {
        getSadGiphy()
        getCleaningGiphy()
    }, [])

    return (
        <div>
            <AppNav navItems={navItems}/>
            <Container fluid>
                
                <Row className="banner firstColor">
                    <Col sm={4}>
                    <img
                        className="d-block"
                        src={cleaning_squid}
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
                        <p>Keep your health up with a clean environment.</p>
                        </Carousel.Caption>
                        <img
                        className="d-block"
                        src={squiward_being_cleaned}
                        alt="Second slide"
                        />
                        
                    </Carousel.Item>
                    <Carousel.Item>
                        
                        <img
                        className="d-block"
                        src={spongebob_crazy}
                        alt="Third slide"
                        />
                        
                    </Carousel.Item>
                </Carousel>
                </Row>
                <Row className="firstColor">
                    <Col className="col-xs-1" align="center">
                        <Card style={{ width: '30rem', height: '30rem' }}>
                            
                        <Card.Body>
                            <Card.Title>You Before The Cleaning App</Card.Title>
                            <Card.Img src={sadGif} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-xs-1" align="center">
                        <Card style={{ width: '30rem', height: '30rem'}}>

                        <Card.Body>
                            <Card.Title>You During The Cleaning App</Card.Title>
                            <Card.Img src={cleaningGif} />
                            
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;