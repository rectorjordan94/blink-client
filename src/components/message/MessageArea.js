import { useEffect, useState } from 'react'
// import { getThreadsFromChannels } from '../../api/threads'
import { createMessage } from '../../api/messages'
import { createThread } from '../../api/threads'
import { addThreadToChannel } from '../../api/channels'
import MessageForm from '../shared/MessageForm'

const MessageArea = (props) => {

    const { currentChannel, threads, user, msgAlert, triggerRefresh, socket } = props

    const [error, setError] = useState(false)
    const [message, setMessage] = useState({})
    
    // useEffect(() => {
    //     console.log('currentChannel in msgArea', currentChannel)
    // }, [currentChannel])
    
    // useEffect(() => {
    //     socket.emit('threads', threads)
    //     console.log(socket.emit('threads', threads))
    // }, [threads])



    const onChange = (e) => {
        e.persist()

        setMessage(prevMessage => {
            const updatedName = e.target.name
            let updatedValue = e.target.value 

            // console.log('input type: ', e.target.type)

            const updatedMessage = {
                [updatedName] : updatedValue
            }

            // console.log('the channel :', updatedMessage)
            
            return {
                ...prevMessage, ...updatedMessage
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createMessage(user, message)
            // nav to the show page
            .then(res => {
                createThread(user, res.data.message)
                    .then(res => {
                        // console.log('currentChannel: ', currentChannel)
                        // console.log('newly created thread: ', res.data.thread)
                        addThreadToChannel(user, currentChannel._id, res.data.thread._id)
                            // .then(() => triggerRefresh())
                            .then(() => {
                                // console.log(res.data)
                                socket.emit('thread', res.data.thread)
                            })
                            .catch(err => {
                                msgAlert({
                                    heading: 'Error',
                                    message: 'Could not add thread to channel',
                                    variant: 'danger'
                                })
                            })
                    })
                    .catch(err => {
                        msgAlert({
                            heading: 'Error',
                            message: 'Could not create thread',
                            variant: 'danger'
                        })
                    })
            })
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Message sent successfully',
                    variant: 'success'
                })
            })
            // if there is an error tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Failed to send message channel',
                    variant: 'danger'
                })
            })
    }

    if (!currentChannel) {
        return (
            <p>Select a channel to start chatting...</p>
        )
    }

    if (!threads) {
        return (
            <p>No messages yet...</p>
        )
    }

    
    
    const threadListItems = threads.map((thread, i) => (
        <button key={i} className="list-group-item list-group-item-action">
            <span className="fw-bold text-primary">{thread.owner.email}</span><span className="badge bg-warning rounded-pill">{thread.replies.length}</span><p>{thread.firstMessage.content}</p>
            </button>
    ))
    
    return (
        <div className="col-10">
            <div className=" bg-dark text-white mx-0">
                <p>{currentChannel.name}</p>
                <p>{currentChannel.description}</p>
            </div>
            <div className="list-group mx-0">
                {threadListItems}
            </div>
            <MessageForm
                message={message}
                handleChange={onChange}
                handleSubmit={onSubmit}
            />
        </div>
    )
    
}

export default MessageArea