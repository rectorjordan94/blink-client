import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { getThreadsFromChannels } from '../../api/threads'
// import { createMessage } from '../../api/messages'
// import { createThread } from '../../api/threads'
// import { addThreadToChannel } from '../../api/channels'
import { getOneThread } from '../../api/threads'
import MessageForm from '../shared/MessageForm'
import ShowThreadModal from '../threads/ShowThreadModal'

//! COME BACK TO THIS

const MessageArea = (props) => {

    const { currentChannel, threads, user, msgAlert, socket, message, handleChange, handleSubmit } = props

    const [error, setError] = useState(false)

    const [currentThread, setCurrentThread] = useState(null)
    const [threadModalShow, setThreadModalShow] = useState(false)
    const [refreshReplies, setRefreshReplies] = useState(false)

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
        console.log('USE EFFECT 3 RAN')
        if (threadId) {
            getOneThread(user, threadId)
            .then(res => {
                setCurrentThread(res.data.thread)
                console.log('res.data.thread.replies: ', res.data.thread.replies)
            })
            .then(() => {
                socket.removeAllListeners()
            })
            .catch(err => {
                setError(true)
            }) 
        }
    }, [threadId, refreshReplies])
    // TOOK REFRESH REPLIES OUT FOR NOW

    useEffect(() => {
        console.log('USE EFFECT 4 RAN')
        if (currentThread) {
            console.log('currentThread in USE EFFECT 4: ', currentThread)
            console.log('currentthread.replies: ', currentThread.replies)
            setReplies(currentThread.replies)
            // setThreadModalShow(true)
        }
    }, [currentThread])

    useEffect(() => {
        console.log('USE EFFECT 5')
        if (replies) {
            console.log('replies in use effect 5: ', replies)
            setThreadModalShow(true)
        }
    }, [replies])
    // useEffect(() => {
    //     // e.target.id is the id of the thread that was clicked on
    //     if (currentThread) {
    //         getOneThread(user, currentThread._id)
    //         .then(res => {
    //             console.log('res.data.thread: ', res.data.thread)
    //             setCurrentThread(res.data.thread)
    //             setThreadModalShow(true)
    //             socket.removeAllListeners()
    //         })
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error',
    //                 message: 'Could not get thread',
    //                 variant: 'danger'
    //             })
    //         })
    //     }
    // }, [refreshReplies])

    if (!currentChannel) {
        return (
            <p>Select a channel to start chatting...</p>
        )
    }

    if (!threads) {
        return (
            <p>No threads yet...</p>
        )
    }
        
    const threadListItems = threads.map((thread, i) => (
        <a href="#" className="list-group-item list-group-item-action channel-threads" onClick={onClick} id={thread._id} key={i}>
                <div style={{pointerEvents: 'none'}} className="d-flex w-100 justify-content-between align-items-center">
                    <h5 className="mb-1 text-primary" style={{pointerEvents: 'none'}}>{thread.author.username ? thread.author.username : thread.owner.email}</h5>
                    <small className="badge bg-warning rounded-pill" style={{pointerEvents: 'none'}}>{thread.replies.length}</small>
                </div>
                <div style={{pointerEvents: 'none'}}>
                    <p className="mb-1 text-white" style={{pointerEvents: 'none'}}>{thread.firstMessage.content}</p>
                    <small className="text-muted" style={{pointerEvents: 'none'}}>3 days ago</small>
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
            />
        </div>
    )
    
}

export default MessageArea