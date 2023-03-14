import { useState, useEffect } from 'react'
import { getMyChannels, getOneChannel } from '../../api/channels'

import Button from 'react-bootstrap/Button'

const ChannelsIndex = (props) => {
    const { msgAlert, user, onClick, refreshMembers, socket, setRefreshMembers } = props

    const [channels, setChannels] = useState([])
    const [error, setError] = useState(false)

    // const [channelId, setChannelId] = useState("")

    // const [currentChannel, setCurrentChannel] = useState({})

    socket.on('triggerMembersRefresh', () => {
        console.log('SET REFRESH MEMBERS FROM SOCKET')
        setRefreshMembers(prev => !prev)
    })

    useEffect(() => {
        if (user) {
            getMyChannels(user)
                .then(res => setChannels(res.data.channels))
                .then(() => {
                    console.log('my channels set')
                    socket.removeAllListeners()
                    console.log('removed listers for socket')
                })
                .catch(err => {
                    setError(true)
                })
        }
    }, [refreshMembers])

    const channelButtons = channels.map((channel, i) => {
        return (
            // <Button key={i}>{channel.name}</Button>
            <button type="button" key={i} className="list-group-item list-group-item-action channel-buttons p-0 mt-1" onClick={onClick} id={channel._id}>
                    # {channel.name}
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