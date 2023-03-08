import { useState } from 'react'
// import Container from 'react-bootstrap/Container'
import ChannelsIndex from '../channels/ChannelsIndex'
// import NewChannelModal from '../channels/NewChannelModal'
import { Link } from 'react-router-dom'

const ChannelSidebar = (props) => {
    const { msgAlert, user } = props

    const [modalShow, setModalShow] = useState(false)

    return (
        <div>
            <ChannelsIndex msgAlert={msgAlert} user={user} />
            {/* <NewChannelModal
                msgAlert={msgAlert}
                user={user}
                show={modalShow}
                handleClose={() => setModalShow(false)}
                triggerRefresh={triggerRefresh}
            /> */}
            <Link to='create-channel'>
				Add New Channel
			</Link>
        </div>
    )
}

export default ChannelSidebar