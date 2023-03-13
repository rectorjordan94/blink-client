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
	margin: '0 .25rem',
	fontFamily: 'Nunito',
	fontSize: '1.1rem',
	display: 'block',
	whiteSpace: 'nowrap'
}
const brandStyle = {
    color: '#000000',
	textDecoration: 'none',
	fontWeight: '400',
	fontFamily: 'Faster One',
	fontSize: '1.75rem',
	marginLeft: '.25rem'
}

const authenticatedOptions = (
	<>
		<NavDropdown.Item>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</NavDropdown.Item>
		<NavDropdown.Item>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</NavDropdown.Item>
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

const noProfile = (
	<>
		<NavDropdown title="Profile" align="end" className="header-dropdown">
			<NavDropdown.Item>
				<Link to='create-profile' style={linkStyle}>
					Create Profile
				</Link>
			</NavDropdown.Item>
			{authenticatedOptions}
		</NavDropdown>
	</>
)

const profileExists = (
	<>
		<NavDropdown title="Profile" align="end" className="header-dropdown">
			<NavDropdown.Item>
				<Link to='profile' style={linkStyle}>
					View Profile
				</Link>
			</NavDropdown.Item>
			{authenticatedOptions}
		</NavDropdown>
	</>
)



const Header = ({ user, profile, msgAlert, channelId, setChannelId, refreshChannels }) => (
	<Navbar bg='primary' variant='dark' expand='md' id='nav-bar'>
		<Navbar.Brand className="mx-2">
            <Link to='/' style={brandStyle}>
                BLINK
            </Link>
		</Navbar.Brand>
		<div className="container d-flex justify-content-center">
			{user ? (
				<ChannelSearch user={user} msgAlert={msgAlert} channelId={channelId} setChannelId={setChannelId} refreshChannels={refreshChannels} />
			) : null}
		</div>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ms-auto me-2 d-flex align-items-center'>
				{user && profile ? profileExists : null}
				{user && !profile ? noProfile : null}
				{alwaysOptions}
				{!user ? unauthenticatedOptions : null}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
