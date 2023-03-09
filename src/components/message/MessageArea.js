import { useEffect, useState } from 'react'
import { getThreadsFromChannels } from '../../api/threads'

const MessageArea = (props) => {

    const { currentChannel, threads, user } = props

    const [error, setError] = useState(false)
    // const [threads, setThreads] = useState([])
    // currentChannel to display
    // react to changes in currentChannel state (altered by selecting a )

    // const [displayChannel, setDisplayChannel] = useState(currentChannel)


    //! MAYBE PULL OUT THE GET THREADS FROM IDS FUNCTIONALITY INTO THIS USE EFFECT INSTEAD

    useEffect(() => {
        console.log('currentChannel in msgArea', currentChannel)
    }, [currentChannel])

    // useEffect(() => {
    //     console.log('threadstring in msgArea: ', threadString)
    //     if (user && threadString) {
    //         getThreadsFromChannels(user, threadString)
	// 			.then(res => setThreads(res.data.threads))
	// 			.catch(err => {
	// 				setError(true)
	// 			})
    //     }
    // }, [threadString])
    
    useEffect(() => {
        console.log('threads in msgArea', threads)
    }, [threads])

    if (currentChannel) {
        // if (currentChannel.threads) {
        //     const threads = currentChannel.threads.map((thread, i) => (
        //         <button key={i} className="list-group-item list-group-item-action">{thread}</button>
        //     ))
        // }
        
        return (
            <div className="col-10">
                <div className=" bg-dark text-white mx-0">
                    <p>{currentChannel.name}</p>
                    <p>{currentChannel.description}</p>
                </div>
                <div className="list-group mx-0">
                    <button className="list-group-item list-group-item-action">thread</button>
                </div>
            </div>
        )
    }


    return (
        <>
        </>
    )
}

export default MessageArea