import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ChannelForm from '../shared/ChannelForm'
import { updateChannel } from '../../api/channels'

const EditChannelModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh } = props

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
            .then(() => handleClose())
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Channel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ChannelForm
                    channel={channel}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditChannelModal