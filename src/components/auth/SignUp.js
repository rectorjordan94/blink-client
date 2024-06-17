// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignUp = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 		passwordConfirmation: '',
	// 	}
	// }    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {email, password, passwordConfirmation}

		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/create-profile'))
			.catch((error) => {
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <div className='row mx-0 w-100'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5 d-flex flex-column auth-container'>
                <h3 className='auth-header'>Sign Up</h3>
                <Form onSubmit={onSignUp}>
                    <Form.Group controlId='email' className='container'>
                        <Form.Label className='auth-label'>Email address</Form.Label>
                        <Form.Control
                            className='auth-control'
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password' className='container mt-3'>
                        <Form.Label className='auth-label'>Password</Form.Label>
                        <Form.Control
                            className='auth-control'
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation' className='container mt-3'>
                        <Form.Label className='auth-label'>Password Confirmation</Form.Label>
                        <Form.Control
                            className='auth-control'
                            required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='Confirm Password'
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                    </Form.Group>
                    <div className="container d-flex justify-content-center my-3">
                        <Button variant='primary' type='submit' className='auth-submit'>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )

}

export default SignUp