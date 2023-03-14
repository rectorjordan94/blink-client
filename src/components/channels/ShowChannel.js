import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getOneChannel, removeChannel } from '../../api/channels'
import MemberSearch from '../shared/MemberSearch'
import EditChannelModal from './EditChannelModal'

const ShowChannel = (props) => {
    const { user, msgAlert, currentChannel, setCurrentChannel, setRefreshChannels } = props

    // console.log('channel in showChannel: ', currentChannel)
    
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
            .then(() => {
                setRefreshChannels(prev => !prev)
            })
            .then(() => {
                navigate('/')
                setCurrentChannel(prev => !prev)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'Unable to delete channel',
                    variant: 'danger'
                })
            })
    }

    if (currentChannel.members.length > 0) {
        console.log(currentChannel.members)
    }


    const membersList = currentChannel.members.map((member, i) => {
        return (
            <p key="i" className="members-list-email">{member.email}</p>
        )
    })

    return (
        <>
            <Container className="mt-5" id="show-channel-container">
                <div className="row" id="show-channel-top-row">
                    <div className="col text-center">
                        <h1 id="show-channel-name"># {currentChannel.name}</h1>
                        <h3 id="show-channel-description">{currentChannel.description}</h3>
                    </div>
                </div>
                <div className="row" id="show-channel-mid-row">
                    <div className="col" id="members-list-col">
                        <p id="members-list-header">Members: </p>
                        <div id="members-list-container">
                            {membersList}
                        </div>
                    </div>
                    <div className="col d-flex flex-column justify-content-center" id="add-members-col">
                        <p id="add-members-header">Add Members: </p>
                        <MemberSearch user={user} msgAlert={msgAlert}triggerRefresh={() => setUpdated(prev => !prev)}currentChannel={currentChannel}/>
                    </div>
                </div>
                <div className="row" id="show-channel-bot-row">
                    <div className="col">
                        <Button className="m-2 auth-submit" variant='info' onClick={() => setEditModalShow(true)}>
                            Edit Channel
                        </Button>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <Button className="m-2 auth-submit" id="delete-channel-button" variant='danger' onClick={() => deleteChannel()}>
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
                setRefreshChannels={setRefreshChannels}
            />
        </>
        
    )
}

export default ShowChannel