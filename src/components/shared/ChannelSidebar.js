import { useState } from 'react'
// import Container from 'react-bootstrap/Container'
import ChannelsIndex from '../channels/ChannelsIndex'
// import NewChannelModal from '../channels/NewChannelModal'
import { Link } from 'react-router-dom'

const ChannelSidebar = (props) => {
    const { msgAlert, user, channelId, onClick } = props

    const [modalShow, setModalShow] = useState(false)

    // const [channelId, setChannelId] = useState("")

    return (
        <div className="col-3 bg-primary d-flex flex-column align-items-center" id="channel-sidebar">
            <div className="container d-flex justify-content-center align-items-center mt-3" id="channel-header-sidebar">
                <p id="my-channels-header">My Channels</p>
                <Link to='create-channel' className="text-white" id="create-channel-button">
                    +
                </Link>
            </div>
            <ChannelsIndex msgAlert={msgAlert} user={user} channelId={channelId} onClick={onClick} />
        </div>
    )
}

export default ChannelSidebar