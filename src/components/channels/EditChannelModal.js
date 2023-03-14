import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ChannelForm from '../shared/ChannelForm'
import { updateChannel } from '../../api/channels'

const EditChannelModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh, setRefreshChannels } = props

    const [channel, setChannel] = useState(props.currentChannel)
    
    const onChange = (e) => {
        e.persist()
        setChannel(prevChannel => {
            const updateName = e.target.name
            let updatedValue = e.target.value

            const updatedChannel = {
                [updateName] : updatedValue
            }

            return {
                ...prevChannel, ...updatedChannel
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateChannel(user, channel)
            .then(() => {
                setRefreshChannels(prev => !prev)
                handleClose()
            })
            .then(() => {
                msgAlert({
                    heading: 'Edit',
                    message: 'Successfully edited channel',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Failed to edit channel',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose} id='edit-channel-modal'>
            <Modal.Header closeButton id='edit-channel-header' closeVariant='white'>
                <Modal.Title>Edit Channel</Modal.Title>
            </Modal.Header>
            <Modal.Body id='edit-channel-body'>
                <ChannelForm
                    channel={channel}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    buttonText={'Edit'}
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditChannelModal