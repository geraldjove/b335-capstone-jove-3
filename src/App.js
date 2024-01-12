
import './App.css';
import {useState, useEffect} from 'react';
import {UserProvider} from './UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import AppNavbar from './components/AppNavBar';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState({id: null, isAdmin: null});
  
  const unsetUser = () =>{
    localStorage.clear();
  }
  
  useEffect(() => {
    console.log("State: ");
    console.log(user); // checks the state
    console.log("Local storage")
    console.log(localStorage); // checks the localStorage
  },[user]);
  
  
  useEffect(() => {
    fetch(`http://localhost:4004/b4/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then(res => res.json())
    .then(data => {
        if(typeof data._id !== "undefined"){
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          })
        }
        else{
          setUser({
            id: null,
            isAdmin: null
          })
        }
    })
  },[])
  
  return (
    <UserProvider value = {{user, setUser, unsetUser}}>
    <Router>
    <Container fluid>
    <AppNavbar />
    <Routes>
    <Route path="/b4/register" element={<Register />}/>
    <Route path="/b4/login" element={<Login />}/>
    </Routes>
    </Container>
    </Router>
    </UserProvider>
    );
  }
  
  export default App;
  