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

    // use channelId set by clicking the button in the index to then make a call to the api to grab the data from that channel, set the currentChannel as the channel recieved from the response data, use properties of that to display
    // useEffect(() => {
    //     console.log('current channel id: ', channelId)
    //     // this works better than onClick because it works every time
    //     if (user) {
    //         getOneChannel(user, channelId)
    //             .then()
    //     }
    // })

    // const onClick = (e) => {
    //     e.preventDefault()
    //     // e.target.id is the id of the channel clicked on
    //     // need to use that id to grab the threads of the button and display them in the message area
    //     // setCurrentChannel(e.target.id)
    //     //! currently does not set the currentChannel on the first click but every click after that does work
    //     console.log(currentChannel)
    // }

    const channelButtons = channels.map((channel, i) => {
        return (
            // <Button key={i}>{channel.name}</Button>
            <button type="button" key={i} className="list-group-item list-group-item-action" onClick={onClick} id={channel._id}>
                    {channel.name}
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