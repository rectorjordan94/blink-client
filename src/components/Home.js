import { useState, useEffect } from 'react'
import ChannelSidebar from "./shared/ChannelSidebar"
import MessageArea from "./message/MessageArea"
import ProfileSidebar from "./profile/ProfileSidebar"
import { getOneChannel } from '../api/channels'

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	const [error, setError] = useState(false)

	const [channelId, setChannelId] = useState("")
	const [currentChannel, setCurrentChannel] = useState({})
	// use channelId set by clicking the button in the index to then make a call to the api to grab the data from that channel, set the currentChannel as the channel recieved from the response data, use properties of that to display

	const onClick = (e) => {
        // OnClick of viewfile - set fileId to the selected file's Id & set show modal true
		e.preventDefault()
		// this currently works but the first click does not grab it, may need to be moved from here? 
		setChannelId(e.target.id)
		console.log('e.target.id: ', e.target.id)
		console.log('channelId: ', channelId)
        // setFileModalShow(true)
	}
	
    useEffect(() => {
        console.log('current channel id: ', channelId)
        // this works better than onClick because it works every time
        if (user) {
            getOneChannel(user, channelId)
				.then(res => setCurrentChannel(res.data.channel))
				.then(() => {
					console.log('currentChannel', currentChannel)
				})
				.catch(err => {
                    setError(true)
                })
        }
    }, [channelId])

	return (
		<div className="container-fluid" >
			<div className="row g-0 flex-nowrap">
				<ChannelSidebar msgAlert={msgAlert} user={user} channelId={channelId} onClick={onClick} />
				<MessageArea  currentChannel={currentChannel} />
				
			</div>	
		</div>
	)
}

export default Home
