import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

const ShowChannel = (props) => {
    const { user, msgAlert, currentChannel, setCurrentChannel } = props

    console.log('channel in showChannel: ', currentChannel)






    const membersList = currentChannel.members.map((member, i) => {
        return (
            <p>{member.email}</p>
        )
    })

    return (
        <Container className="bg-success">
            <div className="row">
                <div className="col">
                    <h1>{currentChannel.name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h3>{currentChannel.description}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    { currentChannel.members.length > 0 ? membersList : 'no members yet...'}
                </div>
            </div>
            <div className="row">
                {/* <div className="col">
                    <Button>Add Members</Button>
                </div> */}
                <div className="col">
                    <Button>Edit Channel</Button>
                </div>
                <div className="col">
                    <Button>Delete Channel</Button>
                </div>
            </div>
        </Container>
    )
}

export default ShowChannel