import { useEffect, useState } from 'react'

const MessageArea = (props) => {

    const { currentChannel } = props
    // currentChannel to display
    // react to changes in currentChannel state (altered by selecting a )

    const [displayChannel, setDisplayChannel] = useState(currentChannel)

    useEffect(() => {
        console.log('currentChannel in msgArea', currentChannel)
    }, [currentChannel])

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