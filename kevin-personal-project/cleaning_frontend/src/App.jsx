import './App.css'
import axios from 'axios';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NewSurfacePage from './pages/NewSurfacePage';
import EditSurfacePage from './pages/EditSurfacePage';

import { HashRouter, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react'
import PrivateRoute from './components/isLogin';

import Surface from './components/Surface';
import SurfacePage from './pages/SurfacePage';
import RegisterPage from './pages/RegisterPage';
import NewTipPage from './pages/NewTipPage';
import EditTipPage from './pages/EditTipPage';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common['X-CSRFToken'] = csrftoken
// console.log(csrftoken)



function App() {
  const [data, setData] = useState([])


  const getData = async() => {
    const response = await axios.post('/lists/')
    const data = response.data

    setData(data)

  }


  useEffect(()=> {

    getData()
  }, [])

  return (
    
    <div className="App">
      <HashRouter> 
        <Routes>
          <Route element={<PrivateRoute/> } >
                < Route path='/' element={<HomePage/>} exact />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/surfaces/:surfaceID' element={<SurfacePage  data = {data} />} />
          <Route path='' element={<Surface data={data} />} />
          <Route path='/new_surface' element={<NewSurfacePage />} />
          <Route path='/surfaces/:surfaceID/edit_surface/:surface_name' element={<EditSurfacePage />} />
          <Route path='/new_cleaning_tip/:surface_name/:surfaceID' element={<NewTipPage />} />
          <Route path='/edit_cleaning_tip/:surface_name/:surfaceID/:cleaningID' element={<EditTipPage />} />
        </Routes>
      </HashRouter>   
    </div>
  )
}

export default App
