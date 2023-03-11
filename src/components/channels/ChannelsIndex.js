import { useState, useEffect } from 'react'
import { getAllChannels, getOneChannel } from '../../api/channels'

import Button from 'react-bootstrap/Button'

const ChannelsIndex = (props) => {
    const { msgAlert, user, onClick } = props

    const [channels, setChannels] = useState([])
    const [error, setError] = useState(false)

    // const [channelId, setChannelId] = useState("")

    // const [currentChannel, setCurrentChannel] = useState({})

    useEffect(() => {
        if (user) {
            getAllChannels(user)
                .then(res => setChannels(res.data.channels))
                .catch(err => {
                    setError(true)
                })
        }
    }, [])

    const channelButtons = channels.map((channel, i) => {
        return (
            // <Button key={i}>{channel.name}</Button>
            <button type="button" key={i} className="list-group-item list-group-item-action bg-dark text-white border-primary" onClick={onClick} id={channel._id}>
                    #{channel.name}
            </button>
        )
    })


    return (
        <div className="list-group">
            {channelButtons}
        </div>
        
    )
}

export default ChannelsIndex