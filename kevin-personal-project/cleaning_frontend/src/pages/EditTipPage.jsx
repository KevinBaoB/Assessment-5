import AppNav from "../components/AppNav";
import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import CSRFToken from "../components/getCookie";


const EditTipPage = () => {

    let {surfaceID, surface_name, cleaningID} = useParams() 
    let [data, setData] = useState([])
    let [items, setItems] = useState(data.items);
    let [routine_care, setRountine_care] = useState(data.routine_care);
    let [special_instructions, setSpecialInstructions] = useState(data.special_instructions);

    const handleItems = (event) => {
        setItems(event.target.value);
      };

    const handleRoutine_care = (event) => {
        setRountine_care(event.target.value);
      };

    const handleSpecial_instructions = (event) => {
        setSpecialInstructions(event.target.value);
      };


    const navigate = useNavigate()

    const getCleaning = async() => {
        const response = await axios.post('cleaning/', {cleaningID: cleaningID})
        let data = response.data.fields
        setData(data)
        setItems(data.items)
        setRountine_care(data.routine_care)
        setSpecialInstructions(data.special_instructions)
    }

    const handleClick = async(event) => {
        event.preventDefault()
        const response = await axios.post('edit_cleaning_tip/', 
        {cleaningID: cleaningID, items: items, routine_care: routine_care, special_instructions: special_instructions }
        )
        console.log(response.data)
        if(response.data === 'Cleaning Edit FAILURE!') {
            console.log('FAILURE')
        }
        else {
            console.log('Success')
            window.location.href = `#/surfaces/${surfaceID}`
            window.location.reload()


        }
    }

    useEffect(() => {
        getCleaning()
        
    }, [cleaningID])

    return ( 
    <div className="form_style">
            <AppNav />
            <h1>Edit The Cleaning Tip</h1>
            <form method="POST" onSubmit={handleClick}>
                <CSRFToken />
                <div>
                    <div>
                        <h2>{surface_name}</h2>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Items included under the Surface: </label>
                    </div>
                    
                    <input className="form-control" type="text" id="items" name='items' onChange={handleItems} defaultValue={items}/>
                </div>
                <div>
                    <label for="exampleFormControlTextarea1">Routine Care Instructions: </label>
                </div>
                
                <textarea className="form-control" id="routine_care" name="routine_care" onChange={handleRoutine_care} value={routine_care}  />

                <div>
                    <label>Special Instructions (If Any): </label>
                </div>
                <textarea className="form-control" id="special_instructions" name="special_instructions" onChange={handleSpecial_instructions} value={special_instructions} />
                <div>
                    <input type="submit" />
                </div>
                
            </form>
    </div>
     );
}
 
export default EditTipPage;