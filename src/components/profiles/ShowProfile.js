import { useState } from 'react'
import Container from 'react-bootstrap/Container'
const ShowProfile = (props) => {
    const { user, msgAlert, profile } = props

    console.log('profile in showProfile: ', profile)

    return (
        <Container>
            <h2>{profile.username}</h2>
            <h3>{profile.fullName}</h3>
            <h4>{profile.pronouns}</h4>
            <h5>{profile.location}</h5>
        </Container>
    )
}

export default ShowProfile