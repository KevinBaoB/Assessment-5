import Dropdown from 'react-bootstrap/Dropdown';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


function AppNav() {

    const [navItems, setNavItems] = useState([])

    const getSurfaceList= async() => {
        const response = await axios.post('surface_list/')

        const navItems = response.data

        setNavItems(navItems)
  }

  useEffect(()=> {
    getSurfaceList()
  }, [])
    
    const logout = async() => {
            const response = await axios.get(`/logout/`)
            const data = response.data

            if(data === 'Logout'){
                window.location.href = '#/login'
            } else {
                console.log('Logout FAILURE!')
            }
        
        }

    return ( 
            <Navbar sticky="top" className='navbar_style'> 
            <Navbar.Brand>
                <img src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/64/1FB141/external-cleaning-stay-at-home-xnimrodx-lineal-gradient-xnimrodx.png" width="50" />
                CP Cleaning
            </Navbar.Brand>
            <Nav className="ml-auto" >
                <Nav.Link href='/'>
                    Home {}
                </Nav.Link>
                <NavDropdown id="dropdown-custom-components"  title="Surfaces">
                {
                    navItems.map(((navItem, index) => {
                        return(
                            <Dropdown.Item key={index} href={`/#/surfaces/${navItem.pk}`} > 
                                 {navItem.fields.name}
                            </Dropdown.Item>
                        )
                    }))
                }
                </NavDropdown>
                <Nav.Link href='#/new_surface' >Add Surface</Nav.Link>
              
              
            </Nav>
            <div className='col d-flex justify-content-end'>
                <Button onClick={logout} className='text-right' variant="outline-danger">Log Out</Button>
             </div>
        </Navbar>
     )
}
 
export default AppNav;