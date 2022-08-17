import axios from "axios"
import Card from "react-bootstrap/Card"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Surface({data, surface_name, surfaceID, editting}) {

    const [surfaceDetailList, setSurfaceDetailList] = useState([])


    const surface_data = async() => {

        if(data.length !== 0) {
            let surface_details = await data.filter(item => item.fields.surface == surfaceID)
        setSurfaceDetailList(surface_details)
        }
        
    }  

    console.log(surfaceDetailList)

    const deleteTip = async(event) => {

        let cleaning_tipID = event.target.value

        let confirmation = confirm('Are you sure you want to DELETE this tip?')

        if(confirmation) {
            const response = await axios.post('delete_cleaning_tip/', {cleaning_tipID: cleaning_tipID})

            if(response.data === 'Cleaning Deletion FAILURE!'){
                alert('DELETION FAILURE')
            } else {
                
                window.location.reload()
            }
                
        } 
    }

    useEffect(() => {
        surface_data()

    }, [data, surfaceID])

    useEffect(() => {
        
        const surface_save = window.localStorage.getItem('my_cleaning_app_detail')
        console.log(JSON.parse(surface_save))
        if (data !== null || data !== "") setSurfaceDetailList(JSON.parse(surface_save))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('my_cleaning_app_detail', JSON.stringify(surfaceDetailList))
    }, [surfaceDetailList])


    return (
        <Container fluid>
                <Row>
                    <div>
                        <h1>{surface_name}</h1> 
                    
                      
                    
                    </div>
                        
                </Row>
                

                {editting ? <Button variant='outline-primary'><Link to={{pathname: `/new_cleaning_tip/${surface_name}/${surfaceID}`}}>Add Cleaning Tip </Link></Button> : ""
                }

                <Row>
                {
                    surfaceDetailList.map((surface)=> {
                        return  (
                            <Card border="white" >
                                
                                <Card.Header className><h3><strong>{surface.fields.items}</strong></h3></Card.Header>
                                
                                <Card.Text>
                                    <h3><strong>Routine Care: </strong></h3>
                                    <h4>{surface.fields.routine_care}</h4>
                                </Card.Text>
                                
                                {surface.fields.special_instructions && 
                                    <Card.Text>
                                        <h3><strong>Special Instructions: </strong></h3>
                                        <h4>{surface.fields.special_instructions}</h4>
                                    </Card.Text>
                                }
                                { editting ? 
                                <div>
                                    <Button variant='outline-danger' onClick={deleteTip} value={surface.pk} style={{ width: '8rem',  }}>Delete Tip</Button>

                                    <Button href={`#/edit_cleaning_tip/${surface_name}/${surfaceID}/${surface.pk}`} variant="outline-primary" value={surface.pk} style={{ width: '8rem',  }}>Edit Tip</Button> 
                                </div>
                                : ""
                            }
                            </Card>
                        )    
                    })
                }  
                </Row>
        </Container>
    )

}

export default Surface