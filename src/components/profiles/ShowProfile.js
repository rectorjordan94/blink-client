import { useState } from 'react'
import Container from 'react-bootstrap/Container'
const ShowProfile = (props) => {
    const { user, msgAlert, profile } = props

    console.log('profile in showProfile: ', profile)

    return (
        <Container className="d-flex justify-content-center align-items-center" id="profile-container">
            {/* <h2>{profile.username}</h2>
            <h3>{profile.fullName}</h3>
            <h4>{profile.pronouns}</h4>
            <h5>{profile.location}</h5> */}
            <div className="card w-75 my-5 text-center" id="profile-card">
                <div className="card-header" id="profile-header">
                    {profile.fullName}
                </div>
                <div className="card-body" id="profile-body">
                    <h5 className="card-title pb-3 fs-1">{profile.username}</h5>
                    <p className="card-text">{profile.pronouns}</p>
                    <p className="card-text">{profile.location}</p>
                </div>
            </div>
        </Container>
    )
}

export default ShowProfile