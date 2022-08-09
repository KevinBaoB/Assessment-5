import AppNav from "../components/AppNav";
import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const NewTipPage = () => {

    let {surfaceID, surface_name} = useParams() 

    const navigate = useNavigate()

    const handleClick = async() => {
        let surface = surfaceID
        let items = document.getElementById("items").value
        let routine_care = document.getElementById("routine_care").value
        let special_instructions = document.getElementById("special_instructions").value
        
        const response = await axios.post('add_cleaning_tip/', {surface: surface, items: items, routine_care: routine_care, special_instructions: special_instructions })

        if(response.data === 'Cleaning Creation FAILURE!') {
            console.log('FAILURE')
        }
        else {
            navigate(-1)
        }
    }


    return ( 
        <div className="form_style">
            <AppNav />
            <h1>Enter Your Cleaning Tip</h1>
            <form method="POST" onSubmit={handleClick}>
                <div>
                    <div>
                        <h2>{surface_name}</h2>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Items included under the Surface: </label>
                    </div>
                    
                    <input className="form-control" type="text" id="items" name='items' placeholder="Enter New Items for your Surface"/>
                </div>
                <div>
                    <label for="exampleFormControlTextarea1">Routine Care Instructions: </label>
                </div>
                
                <textarea className="form-control" id="routine_care" name="routine_care" rows="3" />

                <div>
                    <label>Special Instructions (If Any): </label>
                </div>
                <textarea className="form-control" id="special_instructions" name="special_instructions" rows="3" />
                <div>
                    <input type="submit" />
                </div>
                
            </form>
        </div>
     );
}
 
export default NewTipPage;