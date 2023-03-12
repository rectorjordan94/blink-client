import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { getThreadsFromChannels } from '../../api/threads'
// import { createMessage } from '../../api/messages'
// import { createThread } from '../../api/threads'
// import { addThreadToChannel } from '../../api/channels'
import MessageForm from '../shared/MessageForm'

const MessageArea = (props) => {

    const { currentChannel, threads, user, msgAlert, triggerRefresh, socket, message, handleChange, handleSubmit } = props

    const [error, setError] = useState(false)
    
    const onClick = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        // e.target.id is the id of the thread that was clicked on
    }


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
                    <h5 className="mb-1 text-primary" style={{pointerEvents: 'none'}}>{thread.owner.email}</h5>
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
        </div>
    )
    
}

export default MessageArea