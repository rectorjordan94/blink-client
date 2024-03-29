import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
// import ChannelForm from '../shared/ChannelForm'
// import { updateChannel } from '../../api/channels'
import { replyToThread, removeReply } from '../../api/messages'
import ReplyForm from '../shared/ReplyForm'

const ShowThreadModal = (props) => {
    const { user, show, handleClose, msgAlert, setRefreshReplies, currentThread, socket, replies, convertTimestamps } = props

    // const [channel, setChannel] = useState(props.currentChannel)
    // const [currentThread, setCurrentThread] = useState(null)

    const [reply, setReply] = useState("")

    // console.log('user in showthreadmodal: ', user)
    // console.log('current thread in show thread modal: ', currentThread)
    const onChange = (e) => {
        e.persist()

        setReply(prevReply => {
            const updatedName = e.target.name
            let updatedValue = e.target.value 
            const updatedReply = {
                [updatedName] : updatedValue
            }
            return {
                ...prevReply, ...updatedReply
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        replyToThread(user, reply, currentThread)
			.then(res => {
                setRefreshReplies(prev => !prev)
                socket.emit('resetReplies')
                setReply("")
            })
            // if there is an error tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Failed to send message channel',
                    variant: 'danger'
                })
            })
        // console.log('reply on submit: ', reply)
    }

    // console.log('replies in showThreadmodal: ', replies)
    // const deleteChannel = () => {
    //     removeChannel(user, currentChannel._id)
    //         .then(() => {
    //             setRefreshChannels(prev => !prev)
    //         })
    //         .then(() => {
    //             navigate('/')
    //             setCurrentChannel(prev => !prev)
    //         })
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error',
    //                 message: 'Unable to delete channel',
    //                 variant: 'danger'
    //             })
    //         })
    // }
    // const deleteReply = () => {
    //     removeMessage(user)
    // }

    const deleteReply = (e) => {
        e.preventDefault()
        // console.log(e.target.value)
        removeReply(user, e.target.value)
            .then(() => {
                setRefreshReplies(prev => !prev)
                socket.emit('resetReplies')
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'unable to delete reply',
                    variant: 'danger'
                })
            }) 
    }

    if (currentThread && replies) {
        // console.log('currentThread in modal: ', currentThread)
        
        const repliesArray = replies.map((reply, i) => {
            return (
                // <p key="i">{reply.content}</p>
                <a href="#" className="list-group-item list-group-item replies-list-group-item channel-threads" key={i}>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-0 thread-username">{reply.owner.profile.username}</h5>
                        {user.id === reply.owner._id ?
                            <Button variant='danger' value={reply._id} onClick={deleteReply} className='thread-delete'>X</Button> : null}
                        
                        
                    </div>
                    <p className="mb-0 thread-content">{reply.content}</p>
                    <small className='thread-datetime'>{convertTimestamps(reply.createdAt)}</small>
                </a>
            )
        })
        

        return (
            <Modal show={show} onHide={handleClose} id='reply-modal'>
                <Modal.Header closeButton closeVariant='white' id='reply-modal-header'>
                    <Modal.Title>Reply to Thread</Modal.Title>
                </Modal.Header>
                <Modal.Body id='reply-modal-body'>
                    <div className="list-group mx-0 w-100" style={{ overflowY: 'scroll', maxHeight: '500px' }} id="replies-list-group">
                        <a href="#" className="list-group-item list-group-item first" key={123}>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-0 thread-username">{currentThread.author.username}</h5>
                            
                        </div>
                            <p className="mb-0 thread-content">{currentThread.firstMessage.content}</p>
                            <small className='thread-datetime first-date'>{convertTimestamps(currentThread.createdAt)}</small>
                        </a>
                        {repliesArray}
                    </div>
                    <ReplyForm reply={reply} handleChange={onChange} handleSubmit={onSubmit} />
                </Modal.Body>
            </Modal>
        )
    }

    // must return something even if currentThread is not set, prevents errors before a thread is selected
    return (
        <p style={{display: 'none'}}>...</p>
    )
}

export default ShowThreadModal