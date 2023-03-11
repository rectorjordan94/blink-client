import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getOneChannel, removeChannel } from '../../api/channels'
import EditChannelModal from './EditChannelModal'

const ShowChannel = (props) => {
    const { user, msgAlert, currentChannel, setCurrentChannel } = props

    console.log('channel in showChannel: ', currentChannel)
    
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getOneChannel(user, currentChannel._id)
            .then(res => setCurrentChannel(res.data.channel))
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'Failed to get channel',
                    variant: 'danger'
                })
            }) 
    }, [updated])

    const deleteChannel = () => {
        removeChannel(user, currentChannel._id)
            .then(() => { navigate('/') })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'Unable to delete channel',
                    variant: 'danger'
                })
            })
    }


    const membersList = currentChannel.members.map((member, i) => {
        return (
            <p>{member.email}</p>
        )
    })

    return (
        <>
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
                        { currentChannel.members.length > 0 ? membersList : <p>no members yet...</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Button className="m-2" variant='info' onClick={() => setEditModalShow(true)}>
                            Edit Channel
                        </Button>
                    </div>
                    <div className="col">
                        <Button className="m-2" variant='danger' onClick={() => deleteChannel()}>
                            Delete Channel
                        </Button>
                    </div>
                    
                </div>
            </Container>
            <EditChannelModal
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                currentChannel={currentChannel}
            />
        </>
        
    )
}

export default ShowChannel