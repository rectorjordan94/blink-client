import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
// import { getThreadsFromChannels } from '../../api/threads'
// import { createMessage } from '../../api/messages'
// import { createThread } from '../../api/threads'
// import { addThreadToChannel } from '../../api/channels'
import { getOneThread, removeThreads } from '../../api/threads'
import MessageForm from '../shared/MessageForm'
import ShowThreadModal from '../threads/ShowThreadModal'

const MessageArea = (props) => {

    const { currentChannel, threads, user, msgAlert, socket, message, handleChange, handleSubmit, refreshReplies, setRefreshReplies, profile } = props

    const [error, setError] = useState(false)

    const [currentThread, setCurrentThread] = useState(null)
    const [threadModalShow, setThreadModalShow] = useState(false)
    // const [refreshReplies, setRefreshReplies] = useState(false)

    const [threadId, setThreadId] = useState('')
    const [replies, setReplies] = useState([])

    const onClick = (e) => {
        e.preventDefault()
        setThreadId(e.target.id)
    }

    socket.on('triggerRepliesRefresh', () => {
		setRefreshReplies(prev => !prev)
	})

    useEffect(() => {
        // console.log('USE EFFECT 3 RAN')
        if (threadId) {
            getOneThread(user, threadId)
            .then(res => {
                setCurrentThread(res.data.thread)
                // console.log('res.data.thread.replies: ', res.data.thread.replies)
            })
            .then(() => {
                socket.removeAllListeners()
            })
            .catch(err => {
                setError(true)
            }) 
        }
    }, [threadId, refreshReplies])

    useEffect(() => {
        // console.log('USE EFFECT 4 RAN')
        if (currentThread) {
            setReplies(currentThread.replies)
            // setThreadModalShow(true)
        }
    }, [currentThread])

    useEffect(() => {
        console.log('USE EFFECT 5')
        if (replies) {
            // console.log('replies in use effect 5: ', replies)
            setThreadModalShow(true)
        }
    }, [replies])

    const deleteThread = (e) => {
        e.preventDefault()
        // console.log(e.target.value)
        removeThreads(user, e.target.value, currentChannel._id)
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

    if (!currentChannel) {
        return (
            <div className="container w-75 d-flex justify-content-center align-items-center" id="info-container">
                <div class="card mx-5" id="info-card">
                    <div class="card-header text-center" id="info-header">
                        BLINK
                    </div>
                    <div class="card-body" id="info-body">
                        <h5 class="card-title text-center mb-3" id="info-username">Hi, <span>{ profile ? profile.username : user.email}</span>!</h5>
                        <p class="card-text"><span className="info-spans">Welcome to BLINK</span>, a Slack clone project where users can create and join different channels and chat with other users in real-time.</p>
                        <p class="card-text"><span className="info-spans">For first time users</span>, it is recommend to start by selecting the <span className="info-spans">Create Profile</span> link in the navigation bar so that you can create your own username, add your pronouns, and set your location.</p>
                        <p class="card-text"><span className="info-spans">If this isn't your first rodeo</span>, or if you prefer to use your email as your username, feel free to select one of your channels from the sidebar to start chatting.</p>
                        <p class="card-text"><span className="info-spans">Don't see the channel you're looking for?</span> You can search our entire database of channels using the search bar at the top of the page, or click the <span className='info-spans'>+</span> in the sidebar to create your own and invite other users to join!</p>
                        <p class="card-text">This is a project built with the MERN stack, using the MVC system for organizing the code. To view this project's code or to see any of my other projects click <a href="https://github.com/rectorjordan94" className="info-spans">here</a>.</p>
                    </div>
                    <div class="card-footer text-muted d-flex justify-content-end" id="info-footer">
                        Created by Jordan Rector
                    </div>
                </div>
            </div>
        )
    }

    if (!threads) {
        return (
            <p>No threads yet...</p>
        )
    }
    
    const convertTimestamps = (timestamp) => {
        // Converting timestamps from mongo to readable format
        const formatted = new Date(timestamp)
        const date = formatted.getDate()
        const month = formatted.getMonth() + 1;
        const year = formatted.getFullYear()
        let hours = formatted.getHours()
        let minutes = formatted.getMinutes()
        if (minutes < 10) {
            minutes = '0' + minutes
        } else if (hours < 12) {
            minutes = minutes + 'am'
        } else if (hours > 12) {
            hours = hours - 12
            minutes = minutes + 'pm'
        }
        return `${month}/${date}/${year} ${hours}:${minutes}`
    }

    const threadListItems = threads.map((thread, i) => (
        <a href="#" className="list-group-item list-group-item-action channel-threads" onClick={onClick} id={thread._id} key={i}>
                <div style={{pointerEvents: 'none'}} className="d-flex w-100 justify-content-between align-items-center">
                    <h5 className="mb-1 text-primary" style={{ pointerEvents: 'none' }}>{thread.author.username ? thread.author.username : thread.owner.email}</h5>
                    { thread.replies.length > 0 ? <small className="badge bg-warning rounded-pill" style={{pointerEvents: 'none'}}>{thread.replies.length}</small> : null}
            </div>
            <p className="mb-1 text-white" style={{pointerEvents: 'none'}}>{thread.firstMessage.content}</p>
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <small className="text-muted" style={{ pointerEvents: 'none' }}>{convertTimestamps(thread.createdAt)}</small>
                    {user.id === thread.owner ?
                            <Button variant='danger' value={thread._id} onClick={deleteThread}>X</Button> : null }
                </div>
            </a>
        ))
    
    return (
        <div className="col-9">
            <div className="text-white mx-0 px-3 d-flex flex-column justify-content-center align-items-start" id="channel-header">
                {/* <p>{currentChannel.name}</p> */}
                <Link to='show-channel' id="channel-name" className="text-white fw-bold fs-3" channel={currentChannel}>
				    # {currentChannel.name}
			    </Link>
                <p className="mb-4">{currentChannel.description}</p>
            </div>
            <div className="list-group mx-0 w-100" style={{overflowY: 'scroll', maxHeight: '550px'}} id="channel-thread-list-group">
                {threadListItems}
            </div>
            <MessageForm
                message={message}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <ShowThreadModal
                user={user}
                show={threadModalShow}
                handleClose={() => setThreadModalShow(false)}
                msgAlert={msgAlert}
                currentThread={currentThread}
                replies={replies}
                setCurrentThread={setCurrentThread}
                setRefreshReplies={setRefreshReplies}
                socket={socket}
                convertTimestamps={convertTimestamps}
            />
        </div>
    )
    
}

export default MessageArea