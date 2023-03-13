import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignIn = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	}
	// }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser, setProfile } = props

        const credentials = {email, password}

		signIn(credentials)
            .then((res) => {
                setUser(res.data.user)
                // console.log('res.data.user on signin: ', res.data.user)
                if (res.data.user.profile) {
                    setProfile(res.data.user.profile)
                }
                //! MAY WANT TO NAVIGATE TO CREATE-PROFILE PAGE AUTOMATICALLY ON SIGN IN IF USER DOESN'T HAVE A PROFILE ALREADY
                // else {
                //     navigate('/create-profile')
                // }
            })
			// .then(() =>
			// 	msgAlert({
			// 		heading: 'Sign In Success',
			// 		message: messages.signInSuccess,
			// 		variant: 'success',
			// 	})
			// )
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='row' style={{backgroundColor: '#022C43'}}>
            <div className='col-sm-10 col-md-8 mx-auto mt-5' id="sign-in-container">
                <h1 id="sign-in-header">Sign In</h1>
                <Form onSubmit={onSignIn}>
                    <Form.Group controlId='email' className="container">
                        <Form.Label className='sign-in-label'>Email address</Form.Label>
                        <Form.Control
                            className='sign-in-control'
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password' className="container mt-3">
                        <Form.Label className='sign-in-label'>Password</Form.Label>
                        <Form.Control
                            className='sign-in-control'
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div className="container d-flex justify-content-center my-3">
                        <Button variant='primary' type='submit'>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default SignIn
