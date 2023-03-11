import { useState, useEffect } from 'react'
import ChannelSidebar from "./shared/ChannelSidebar"
import MessageArea from "./messages/MessageArea"
// import ProfileSidebar from "./profile/ProfileSidebar"
import { getOneChannel } from '../api/channels'
import { getThreadsFromChannels } from '../api/threads'
import { createMessage } from '../api/messages'
import { createThread } from '../api/threads'
import { addThreadToChannel } from '../api/channels'

const Home = (props) => {
	const { msgAlert, user, socket } = props
	// console.log('props in home', props)
	const [error, setError] = useState(false)
	const [channelId, setChannelId] = useState("")
	const [currentChannel, setCurrentChannel] = useState({
		name: "",
		description: ""
	})
	const [threadIds, setThreadIds] = useState("")
	const [threads, setThreads] = useState([])
	const [message, setMessage] = useState({})
	const [refreshThreads, setRefreshThreads] = useState(false)


	const onClick = (e) => {
		e.preventDefault()
		setChannelId(e.target.id)
	}

	socket.on('triggerRefresh', () => {
		setRefreshThreads(prev => !prev)
	})

	useEffect(() => {
		console.log('USE EFFECT 1 RAN ****************')
        if (user) {
            getOneChannel(user, channelId)
				.then((res) => {
					setCurrentChannel(res.data.channel)
					setThreadIds(res.data.channel.threads)
					console.log('reset current channel and threads ran')
				})
				.then(() => {
					socket.removeAllListeners()
				})
				.catch(err => {
                    setError(true)
                })
        }
	}, [channelId, refreshThreads])

	useEffect(() => {
		console.log('USE EFFECT 2 RAN [][][][][][][]]')
		if (threadIds && user) {
			let threadString = threadIds.toString()
			getThreadsFromChannels(user, threadString)
				.then(res => setThreads(res.data.threads))
				.catch(err => {
					setError(true)
				})
		}
	}, [threadIds])

	const onChange = (e) => {
        e.persist()

        setMessage(prevMessage => {
            const updatedName = e.target.name
            let updatedValue = e.target.value 
            const updatedMessage = {
                [updatedName] : updatedValue
            }
            return {
                ...prevMessage, ...updatedMessage
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createMessage(user, message)
			.then(res => {
                createThread(user, res.data.message)
					.then(res => {
						addThreadToChannel(user, currentChannel._id, res.data.thread._id)
							.then(res => {
							setRefreshThreads(prev => !prev)
							socket.emit('resetThreads')
						})
						.catch(err => {
							msgAlert({
								heading: 'Error',
								message: 'Could not add thread to channel',
								variant: 'danger'
							})
						})
                    })
                    .catch(err => {
                        msgAlert({
                            heading: 'Error',
                            message: 'Could not create thread',
                            variant: 'danger'
                        })
                    })
            })
            // if there is an error tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Failed to send message channel',
                    variant: 'danger'
                })
            })
    }


	return (
		<div className="container-fluid" >
			<div className="row g-0 flex-nowrap">
				<ChannelSidebar msgAlert={msgAlert} user={user} channelId={channelId} onClick={onClick} />
				<MessageArea message={message} handleChange={onChange} handleSubmit={onSubmit}  socket={socket} currentChannel={currentChannel} threads={threads} user={user} msgAlert={msgAlert}  />
			</div>	
		</div>
	)
}

export default Home

// triggerRefresh={() => setThreads(prev => !prev) }