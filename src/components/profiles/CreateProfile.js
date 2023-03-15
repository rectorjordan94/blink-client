// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// import { signUp, signIn } from '../../api/auth'
import { createProfile, addProfileToUser } from '../../api/profiles'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateProfile = (props) => {
    const { msgAlert, user, setProfile } = props
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [location, setLocation] = useState('')
    const [pronouns, setPronouns] = useState('')
    // const [owner, setOwner] = useState(user._id)
    const navigate = useNavigate()

	const onProfileCreate = (event) => {
		event.preventDefault()

        const profileInfo = {username, fullName, location, pronouns}

        // need to make an api call to create the profile, then another to add the profile to a user (needs the profile id for that?)
		createProfile(user, profileInfo)
			// .then(() => signIn(profileInfo))
            .then((res) => {
                console.log('res.data.profile: ', res.data.profile)
                addProfileToUser(user, res.data.profile)
                setProfile(res.data.profile)
            })
			.then(() =>
				msgAlert({
					heading: 'Create Profile success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setUsername('')
                setFullName('')
                setLocation('')
                setPronouns('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}

    //! REMOVED required ATTRIBUTE FROM ALL FORM CONTROLS, MAY NEED TO ADD BACK LATER IF THERE ARE ISSUES

    return (
        <div className='row mx-0 w-100'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5 d-flex flex-column auth-container'>
                <h3 className='auth-header'>Create Profile</h3>
                <Form onSubmit={onProfileCreate}>
                    <Form.Group controlId='username' className='container'>
                        <Form.Label className='auth-label'>Username</Form.Label>
                        <Form.Control
                            className='auth-control'
                            type='text'
                            name='username'
                            value={username}
                            placeholder='Enter username'
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password' className='container mt-3'>
                        <Form.Label className='auth-label'>Full Name</Form.Label>
                        <Form.Control
                            className='auth-control'
                            name='fullName'
                            value={fullName}
                            type='text'
                            placeholder='Enter full name'
                            onChange={e => setFullName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation' className='container mt-3'>
                        <Form.Label className='auth-label'>Location</Form.Label>
                        <Form.Control
                            className='auth-control'
                            name='location'
                            value={location}
                            type='text'
                            placeholder='Where are you located?'
                            onChange={e => setLocation(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation' className='container mt-3'>
                        <Form.Label className='auth-label'>Pronouns</Form.Label>
                        <Form.Control
                            className='auth-control'
                            name='pronouns'
                            value={pronouns}
                            type='text'
                            placeholder='What are your pronouns?'
                            onChange={e => setPronouns(e.target.value)}
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

export default CreateProfile