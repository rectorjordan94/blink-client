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
            <p key="i">{member.email}</p>
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
                        {membersList}
                    </div>
                    <div className="col">
                        <MemberSearch user={user} msgAlert={msgAlert}triggerRefresh={() => setUpdated(prev => !prev)}currentChannel={currentChannel}/>
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
                setRefreshChannels={setRefreshChannels}
            />
        </>
        
    )
}

export default ShowChannel