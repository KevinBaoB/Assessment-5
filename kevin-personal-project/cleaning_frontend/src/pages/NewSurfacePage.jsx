import axios from "axios";
import AppNav from "../components/AppNav";


const NewSurfacePage = () => {

    const handleClick = async(event) => {
        event.preventDefault()
        let name = document.getElementById("name").value
        
        const response = await axios.post('add_surface/', {name: name})

        if(response.data === 'Surface Creation FAILURE!') {
            console.log('FAILURE')
        }
        else {
            window.location.href = '/'
        }
        

    }

    return ( 
        <div className="form_style">
            <AppNav />
            <h2>Enter Your New Surface to Clean</h2>
            <form method="POST" onSubmit={handleClick}>
                <input type="text" id="name" name='name' placeholder="Enter New Surface Name"/>
                <input type="submit" />
            </form>
        </div>
        
     );
}
 
export default NewSurfacePage;