import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import Surface from '../components/Surface'
import {useState} from 'react'
import { useEffect } from 'react'
import AppNav from '../components/AppNav'
import Products from '../components/Products'
import { Button, Container } from 'react-bootstrap'


function SurfacePage ({data}){

    const [surface_name, setSurfaceName] = useState([])
    const [editting, setEditting] = useState(false)
    
    let {surfaceID} = useParams()

    const editOnorOff = () => {

        setEditting(!editting)

    } 


    const getSurfaceName= async() => {
        const response = await axios.post('surface/', {surfaceID: surfaceID})

        const surface_name = response.data.fields.name

        setSurfaceName(surface_name)
  }

const handleClick = async() => {

    let confirmation = confirm('Are you sure you want to DELETE this surface?')
    
    if(confirmation) {
        const response = await axios.post('delete_surface/', {surfaceID: surfaceID})

        if(response.data === 'Surface Deletion FAILURE!') {
        console.log('FAILURE')
        }
          else {
            window.location.href = '/'
         }
    }

}

    useEffect(()=> {

        getSurfaceName()
        
    }, [surfaceID, data])


    return (
        <div>
            <AppNav />
            
            <div className='details'> 
               <Surface data={data} surface_name={surface_name} surfaceID={surfaceID} editting={editting} />
               {editting ? <div>
                    <Button variant="outline-danger" onClick={handleClick} >
                        Delete Surface
                    </Button>

                    <Button href={`edit_surface/${surface_name}`} variant="outline-primary">
                    Edit Surface 
                    </Button>
               </div> : ""
                }   
                <Button onClick={editOnorOff} variant="outline-primary" style={{ width: '8rem',  }}>Edit</Button>
            </div>
            
            
            <Products surface_name={surface_name} />
        </div>
    )
}

export default SurfacePage