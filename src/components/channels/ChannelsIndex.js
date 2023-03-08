import { useState, useEffect } from 'react'
import { getAllChannels } from '../../api/channels'
import Button from 'react-bootstrap/Button'

const ChannelsIndex = (props) => {
    const { msgAlert, user } = props

    const [channels, setChannels] = useState([])
    const [error, setError] = useState(false)

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
            <Button>{channel.name}</Button>
        )
    })


    return (
        <div>
            {channelButtons}
        </div>
        
    )
}

export default ChannelsIndex