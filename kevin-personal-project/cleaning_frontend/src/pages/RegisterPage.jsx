import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Container, Form } from 'react-bootstrap';


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
        <Container fluid>
                
            <h1>
                <img src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png" width="100" />
                Cleaning App Register
            </h1>
            <Card style={{ width: '30rem' }}>

                <Form method="POST" onSubmit={handleClick}>
                    <Form.Group className='mb-3'>
                        <label className="form-label">UserName: </label>
                        <input className="form-control" type="text" id="username" name='username' placeholder="Enter Username"/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <label className="form-label">Email: </label>
                        <input className="form-control" type="text" id="email" name='email' placeholder="Enter Email"/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <label className="form-label">Password: </label>
                        <input className="form-control" type="password" id="password1" name='password1' placeholder="Enter Password"/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <label className="form-label">Confirm Password: </label>
                        <input className="form-control" type="password" id="password2" name='password2' placeholder="Enter Password"/>
                    </Form.Group>
                    
                    <input type="submit" />
                </Form>
                <div>
                <Link to="/login">Already have a login? Log in Here!</Link>
                </div>
            </Card>

        </Container>
        
     );
}
 
export default RegisterPage;