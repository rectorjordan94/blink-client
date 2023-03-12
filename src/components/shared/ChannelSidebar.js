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
        <div className="col-3 bg-primary" id="channel-sidebar">
            <h5>Channels</h5>
            <ChannelsIndex msgAlert={msgAlert} user={user} channelId={channelId} onClick={onClick} />
            {/* <NewChannelModal
                msgAlert={msgAlert}
                user={user}
                show={modalShow}
                handleClose={() => setModalShow(false)}
                triggerRefresh={triggerRefresh}
            /> */}
            <Link to='create-channel' className="text-white">
				Add New Channel
			</Link>
        </div>
    )
}

export default ChannelSidebar