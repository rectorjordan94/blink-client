import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ChannelSearch from './ChannelSearch'
const linkStyle = {
    color: '#000000',
	textDecoration: 'none',
	fontWeight: '500',
	margin: '0 .25rem'
}
const brandStyle = {
    color: '#000000',
	textDecoration: 'none',
	fontWeight: '900'
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
		{/* <NavDropdown title="Dropdown">
			{authenticatedOptions}
			<NavDropdown.Item href="#action3">Action</NavDropdown.Item>
			<NavDropdown.Item href="#action4">
				Another action
			</NavDropdown.Item>
			<NavDropdown.Divider />
			<NavDropdown.Item href="#action5">
				Something else here
			</NavDropdown.Item>
		</NavDropdown> */}
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

const Header = ({ user, profile, msgAlert, channelId, setChannelId, refreshChannels }) => (
	<Navbar bg='primary' variant='dark' expand='md' id='nav-bar'>
		<Navbar.Brand className="mx-2">
            <Link to='/' style={brandStyle}>
                BLINK
            </Link>
		</Navbar.Brand>
		{user && (
			<ChannelSearch user={user} msgAlert={msgAlert} channelId={channelId} setChannelId={setChannelId} refreshChannels={refreshChannels} />
		)}
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ms-auto me-2 d-flex align-items-center'>
				{profile ? <span className="navbar-text mx-2">Welcome, {profile.username}</span> : user && ( <span className="navbar-text mx-2">Welcome, {user.email} </span>)}
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
