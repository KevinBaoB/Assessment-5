import axios from 'axios';
import { Link } from 'react-router-dom';


const RegisterPage = () => {

    const handleClick = async(event) => {
        event.preventDefault()
        let username = document.getElementById("username").value
        let email= document.getElementById("email").value
        let password1 = document.getElementById("password1").value
        let password2 = document.getElementById("password2").value

        
        const response = await axios.post('register/', {username: username, email: email, password1: password1, password2: password2})

        if(response.data === 'NONE') {
            console.log('FAILURE')
        }
        else {
            window.location.href = '#/login'
        }
        

    }

    return ( 
        <div className='App'>
                
            <h1>
                <img src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png" width="100" />
                Cleaning App Register
            </h1>
            
             <form method="POST" onSubmit={handleClick}>
                <input type="text" id="username" name='username' placeholder="Enter Username"/>
                <input type="text" id="email" name='email' placeholder="Enter Email"/>
                <input type="password" id="password1" name='password1' placeholder="Enter Password"/>
                <input type="password" id="password2" name='password2' placeholder="Enter Password"/>
                <input type="submit" />
            </form>
            <div>
                <Link to="/login">Already have a login? Log in Here!</Link>
            </div>
        </div>
        
     );
}
 
export default RegisterPage;