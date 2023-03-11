import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import ChannelSearch from './ChannelSearch'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Item>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
	</>
)

const profileExists = (
	<>
		<Nav.Item>
			<Link to='profile' style={linkStyle}>
				Profile
			</Link>
		</Nav.Item>
	</>
)

const noProfile = (
	<>
		<Nav.Item>
			<Link to='create-profile' style={linkStyle}>
				Create Profile
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user, profile, msgAlert, channelId, setChannelId }) => (
	<Navbar bg='primary' variant='dark' expand='md'>
		<Navbar.Brand className="mx-2">
            <Link to='/' style={linkStyle}>
                BLINK
            </Link>
		</Navbar.Brand>
		{user && (
			<ChannelSearch user={user} msgAlert={msgAlert} channelId={channelId} setChannelId={setChannelId} />
		)}
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{profile ? <span className="navbar-text mr-2">Welcome, {profile.username}</span> : user && ( <span className="navbar-text mr-2">Welcome, {user.email} </span>)}
				{/* {user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)} */}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
				{profile ? profileExists : noProfile}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
