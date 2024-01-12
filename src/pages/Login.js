import { Form, Button } from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import {Navigate} from "react-router-dom";

export default function Login() {

	// State hooks to store the values of the input fields
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    const { user, setUser } = useContext(UserContext);

    // useEffect() will be triggered every time the state of email and password changes
	useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }
    }, [email, password]);

    function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();

		fetch('http://localhost:4004/b4/users/login',{
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			// successful login
			if(data.access){

				localStorage.setItem('access', data.access);
				// setUser(data); // user = {access: adskjaslkdqwk }
				retrieveUserDetails(data.access);

				alert(`You are now logged in`);

			
			} else if (data.error == "No Email Found") {

				alert(`Email not found`);

			} else {

				alert(data.message)
			}
		})
		// Clear input fields after submission
		setEmail('');
		setPassword('');
	}

	const retrieveUserDetails = (token) => {

		fetch("http://localhost:4004/b4/users/details", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})

			console.log(user);
		})
	}

    return ( 
		    <Form onSubmit={(e) => authenticate(e)}>
		    	<h1 className="my-5 text-center">Login</h1>
		        <Form.Group controlId="userEmail">
		            <Form.Label>Email address</Form.Label>
		            <Form.Control 
		                type="email" 
		                placeholder="Enter email"
		                value={email}
		    			onChange={(e) => setEmail(e.target.value)}
		                required
		            />
		        </Form.Group>

		        <Form.Group controlId="password">
		            <Form.Label>Password</Form.Label>
		            <Form.Control 
		                type="password" 
		                placeholder="Password"
		                value={password}
		    			onChange={(e) => setPassword(e.target.value)}
		                required
		            />
		        </Form.Group>

		         { isActive ? 
	                <Button variant="primary" type="submit" id="submitBtn">
	                    Submit
	                </Button>
	                : 
	                <Button variant="danger" type="submit" id="submitBtn" disabled>
	                    Submit
	                </Button>
	            }
		    </Form>
	)
}

