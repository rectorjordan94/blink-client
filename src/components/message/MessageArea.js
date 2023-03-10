import { useEffect, useState } from 'react'
// import { getThreadsFromChannels } from '../../api/threads'
// import { createMessage } from '../../api/messages'
// import { createThread } from '../../api/threads'
// import { addThreadToChannel } from '../../api/channels'
import MessageForm from '../shared/MessageForm'

const MessageArea = (props) => {

    const { currentChannel, threads, user, msgAlert, triggerRefresh, socket, message, handleChange, handleSubmit } = props

    const [error, setError] = useState(false)
    
    // useEffect(() => {
    //     console.log('threads in msg Area: ', threads)
    // }, [threads])



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
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
    
}

export default MessageArea