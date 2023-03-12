// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import CreateChannel from './components/channels/CreateChannel'
import ShowChannel from './components/channels/ShowChannel'
import ShowProfile from './components/profiles/ShowProfile'
import CreateProfile from './components/profiles/CreateProfile'

import apiUrl from './apiConfig'
import { io } from "socket.io-client";
const socket = io.connect(apiUrl)

const App = () => {
	
	useEffect(() => {
		socket.on('connect', () => console.log(socket.id))
		socket.on('disconnect', () => console.log('disconnected'))
		return () => socket.disconnect()
	}, [])

	const [user, setUser] = useState(null)
	const [profile, setProfile] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	const [currentChannel, setCurrentChannel] = useState(null)
	const [channelId, setChannelId] = useState("")
	const [refreshChannels, setRefreshChannels] = useState(false)
	// console.log('user in app', user)
	// console.log('message alerts', msgAlerts)
	const clearUser = () => {
		console.log('clear user ran')
		setUser(null)
	}

	const clearProfile = () => {
		console.log('clear profile ran')
		setProfile(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
			)
		})
	}

		return (
			<Fragment>
				{/* deleted currentChannel and setCurrentChannel from header props */}
				<Header user={user} profile={profile} channelId={channelId} setChannelId={setChannelId} refreshChannels={refreshChannels} />
				<Routes>
					<Route path='/' element={
						<RequireAuth user={user}>
							<Home msgAlert={msgAlert} user={user} socket={socket} profile={profile} currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} channelId={channelId} setChannelId={setChannelId} />
						</RequireAuth>}
					/>
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} setProfile={setProfile} />}
					/>
					<Route
						path='/sign-out'
						element={
							<RequireAuth user={user}>
								<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} clearProfile={clearProfile} />
							</RequireAuth>}
					/>
					<Route
						path='/profile'
						element={
							<RequireAuth user={user}>
								<ShowProfile msgAlert={msgAlert} user={user} profile={profile} />
							</RequireAuth>}
					/>
					<Route
						path='/create-profile'
						element={
							<RequireAuth user={user}>
								<CreateProfile msgAlert={msgAlert} user={user} setProfile={setProfile} />
							</RequireAuth>}
					/>
					<Route
						path='/change-password'
						element={
							<RequireAuth user={user}>
								<ChangePassword msgAlert={msgAlert} user={user} />
							</RequireAuth>}
					/>
					<Route
						path='/create-channel'
						element={
						<RequireAuth user={user}>
							<CreateChannel msgAlert={msgAlert} user={user} setRefreshChannels={setRefreshChannels} />
						</RequireAuth>}
					/>
					<Route
						path='/show-channel'
						element={
						<RequireAuth user={user}>
								<ShowChannel msgAlert={msgAlert} user={user} currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} setRefreshChannels={setRefreshChannels} />
						</RequireAuth>}
					/>
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
