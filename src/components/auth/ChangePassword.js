import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()

	const onChangePassword = (event) => {
		event.preventDefault()

		const { msgAlert, user } = props
        console.log('the user', user)
        

        const passwords = {oldPassword, newPassword}

		changePassword(passwords, user)
			.then(() =>
				msgAlert({
					heading: 'Change Password Success',
					message: messages.changePasswordSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
				setOldPassword('')
                setNewPassword('')
				msgAlert({
					heading: 'Change Password Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}



    return (
        <div className='row w-100'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5 d-flex flex-column auth-container'>
                <h3 className='auth-header'>Change Password</h3>
                <Form onSubmit={onChangePassword}>
                    <Form.Group controlId='oldPassword' className='container'>
                        <Form.Label className='auth-label'>Old password</Form.Label>
                        <Form.Control
                            required
                            className='auth-control'
                            name='oldPassword'
                            value={oldPassword}
                            type='password'
                            placeholder='Old Password'
                            onChange={e => setOldPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='newPassword' className='container mt-3'>
                        <Form.Label className='auth-label'>New Password</Form.Label>
                        <Form.Control
                            className='auth-control'
                            required
                            name='newPassword'
                            value={newPassword}
                            type='password'
                            placeholder='New Password'
                            onChange={e => setNewPassword(e.target.value)}
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

export default ChangePassword