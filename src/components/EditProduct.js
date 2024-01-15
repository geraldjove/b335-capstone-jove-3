import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({product, fetchData}){

	// console.log("Environment: ")
	// console.log(process.env)
	// console.log(process.env.REACT_APP_API_URL);


	// state for courseId for the fetch URl
	const [productId, setProductId] = useState('');

	// Forms state
	const [name, setName] = useState("");
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');

	// state for editCourse modals to open/close
	const [showEdit, setShowEdit] = useState(false);


	// openEdit function is for retrieving a specific course
	const openEdit = (productId) => {
		// Request to get a specific course
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setProductId(data.products._id);
			setName(data.products.name);
			setDescription(data.products.description);
			setPrice(data.products.price);
		})

		setShowEdit(true); // once showEdit value will be true, the modal will show.
	}

	// This function is to reset the states once the modal for editing a course is closed.
	const closeEdit = () => {
		setShowEdit(false);
		setName('');
		setDescription('');
		setPrice(0);
	}

	const editProduct = (e, productId) => {
		e.preventDefault();
		
		fetch(`${ process.env.REACT_APP_API_URL}/products/${productId}/update`, {
			method: 'PATCH',
			headers: {
				'Content-Type' : "application/json",
				Authorization: `Bearer ${localStorage.getItem("access")}`
			},
			body: JSON.stringify({
				// field: state
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log('data', data)
			if(data === true){
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Course Successfully Updated'
				})
				closeEdit();
				fetchData();
			}
			else{
				console.log('data', data)
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
				closeEdit();
				fetchData();
			}
		})
	}

	const deleteProduct = (e, productId) =>{
		fetch(`${ process.env.REACT_APP_API_URL}/products/${productId}/update`, {
			method: 'PATCH',
			headers: {
				'Content-Type' : "application/json",
				Authorization: `Bearer ${localStorage.getItem("access")}`
			},
			body: JSON.stringify({
				// field: state
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log('data', data)
			if(data === true){
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Course Successfully Updated'
				})
				closeEdit();
				fetchData();
			}
			else{
				console.log('data', data)
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
				closeEdit();
				fetchData();
			}
		})
	}


	return(
		<>	
		<Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit </Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={event => editProduct(event, productId)} >
					<Modal.Header closeButton>
						<Modal.Title>Edit Course</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={event => setName(event.target.value)} required />
						</Form.Group>

						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" value={description} onChange={event => setDescription(event.target.value)} required />
						</Form.Group>

						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" value={price} onChange={event => setPrice(event.target.value)} required />
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
			          <Button variant="secondary" onClick={closeEdit}>
			            Close
			          </Button>
			          <Button variant="primary" type="submit">
			            Save Changes
			          </Button>
			        </Modal.Footer>

				</Form>
			</Modal>
		</>

	)





}