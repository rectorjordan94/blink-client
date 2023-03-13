import { useState } from 'react'
import { Modal } from 'react-bootstrap'
// import ChannelForm from '../shared/ChannelForm'
// import { updateChannel } from '../../api/channels'
import { replyToThread } from '../../api/messages'
import ReplyForm from '../shared/ReplyForm'

const ShowThreadModal = (props) => {
    const { user, show, handleClose, msgAlert, setRefreshReplies, currentThread, socket, replies } = props

    // const [channel, setChannel] = useState(props.currentChannel)
    // const [currentThread, setCurrentThread] = useState(null)

    const [reply, setReply] = useState("")

    // console.log('user in showthreadmodal: ', user)
    console.log('current thread in show thread modal: ', currentThread)
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

    console.log('replies in showThreadmodal: ', replies)


    if (currentThread && replies) {
        // console.log('currentThread in modal: ', currentThread)
        
        const repliesArray = replies.map((reply, i) => {
            return (
                // <p key="i">{reply.content}</p>
                <a href="#" className="list-group-item list-group-item-action" key="i">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{reply.owner.profile.username}</h5>
                        <small>3 days ago</small>
                    </div>
                    <p className="mb-1">{reply.content}</p>
                </a>
            )
        })
        

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reply to Thread</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="list-group mx-0 w-100" style={{ overflowY: 'scroll', maxHeight: '300px' }} id="replies-list-group">
                    <a href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{currentThread.author.username}</h5>
                        <small>3 days ago</small>
                    </div>
                    <p className="mb-1">{currentThread.firstMessage.content}</p>
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