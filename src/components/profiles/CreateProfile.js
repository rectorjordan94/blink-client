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
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Sign Up</h3>
                <Form onSubmit={onProfileCreate}>
                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            name='username'
                            value={username}
                            placeholder='Enter username'
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            name='fullName'
                            value={fullName}
                            type='text'
                            placeholder='Enter full name'
                            onChange={e => setFullName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation'>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            name='location'
                            value={location}
                            type='text'
                            placeholder='Where are you located?'
                            onChange={e => setLocation(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation'>
                        <Form.Label>Pronouns</Form.Label>
                        <Form.Control
                            name='pronouns'
                            value={pronouns}
                            type='text'
                            placeholder='What are your pronouns?'
                            onChange={e => setPronouns(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )

}

export default CreateProfile