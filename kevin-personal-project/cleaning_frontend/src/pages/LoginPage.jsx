import { Card, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    

    const handleClick = async(event) => {
        event.preventDefault()
        let username = document.getElementById("username").value

        let password= document.getElementById("password").value
        
        const response = await axios.post('login/', {username: username, password: password})

        if (response.data === 'Failure'){
            console.log('Failure')
            alert('Login Incorrect!')
        }
        else {
             window.location.href = '/'
        }
            

    }

    return ( 
        <Container className='justify-content-center'>
                
            <h1>
                <img src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png" width="100" />
                Cleaning App Login
            </h1>
            <Card style={{ width: '30rem' }}>
                <Form method="POST" onSubmit={handleClick}>
                <Form.Group className='mb-3'>
                    <label className="form-label">Username</label>
                    <input className="form-control" type="text" id="username" name='username' placeholder="Enter Username"/>
                </Form.Group>
                    
                <Form.Group className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" id="password" name='password' placeholder="Enter Password" />
                </Form.Group>
                
                <input type="submit" />
            </Form>
            </Card>
             
            <div>
                <Link to='/register'>Don't have a login? Sign up Here</Link>
            </div>
        </Container>
        
     );
}

export default LoginPage;