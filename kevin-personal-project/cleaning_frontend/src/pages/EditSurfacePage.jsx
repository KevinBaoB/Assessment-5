import axios from "axios";
import { useParams} from "react-router-dom";
import AppNav from "../components/AppNav";
import { useState } from "react";

const EditSurfacePage = () => {

    let {surfaceID} = useParams()
    let {surface_name} = useParams()
    const [name, setName] = useState(surface_name);

    const handleChange = (event) => {
        setName(event.target.value);
      };

    const handleClick = async(event) => {
        event.preventDefault()
        let name = document.getElementById("name").value
        
        const response = await axios.post('edit_surface/', {name: name, surfaceID: surfaceID})

        if(response.data === 'Surface Edit FAILURE!') {
            console.log('FAILURE')
        }
        else {
            window.location.href = `#/surfaces/${surfaceID}`
            window.location.reload()
        }
        

    }

    return ( 
        <div className="form_style">
            <AppNav />
            <h2>Edit Your Surface Here</h2>
            <form method="POST" onSubmit={handleClick}>
                <input type="text" id="name" name='name' onChange={handleChange} value= {name} />
                <input type="submit" />
            </form>
        </div>
        
     );
}
 
export default EditSurfacePage;