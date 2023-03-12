import { useState } from 'react'
import { Modal } from 'react-bootstrap'
// import ChannelForm from '../shared/ChannelForm'
// import { updateChannel } from '../../api/channels'

const ShowThreadModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh, setRefreshChannels } = props

    // const [channel, setChannel] = useState(props.currentChannel)
    const [currentThread, setCurrentThread] = useState(null)

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>View Thread</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="list-group mx-0 w-100" style={{overflowY: 'scroll', maxHeight: '300px'}} id="channel-thread-list-group">
                    {/* {replies} */}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ShowThreadModal