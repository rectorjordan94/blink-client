import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user, clearProfile } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
			.finally(() => clearProfile())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row mx-0 w-100'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5 d-flex flex-column auth-container'>
                    <h2 className='auth-header' id="sign-out-header">Are you sure you want to sign out?</h2>
                    <p id="sign-out-message" className='mb-4 mt-1'>Blink and you'll miss it...</p>
                    <div className="container d-flex justify-content-evenly mb-3">
                        <Button variant='danger' onClick={onSignOut} className='auth-submit'>
                            Sign Out
                        </Button>
                        <Button variant='warning' onClick={onCancel} className='auth-submit' id="sign-out-cancel">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
		</>
	)
}

export default SignOut
