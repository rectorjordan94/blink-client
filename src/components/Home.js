import { useState, useEffect } from 'react'
import ChannelSidebar from "./shared/ChannelSidebar"
import MessageArea from "./message/MessageArea"
import ProfileSidebar from "./profile/ProfileSidebar"
import { getOneChannel } from '../api/channels'
import { getThreadsFromChannels } from '../api/threads'
import { createMessage } from '../api/messages'
import { createThread } from '../api/threads'
import { addThreadToChannel } from '../api/channels'

const Home = (props) => {
	const { msgAlert, user, socket } = props
	console.log('props in home', props)

	const [error, setError] = useState(false)

	const [channelId, setChannelId] = useState("")
	const [currentChannel, setCurrentChannel] = useState({
		name: "",
		description: ""
	})
	const [threadIds, setThreadIds] = useState("")
	const [threads, setThreads] = useState([])
	// const [threads, setThreads] = useState([])
	// use channelId set by clicking the button in the index to then make a call to the api to grab the data from that channel, set the currentChannel as the channel recieved from the response data, use properties of that to display

	const [message, setMessage] = useState({})

	const [refreshThreads, setRefreshThreads] = useState(false)

	const onClick = (e) => {
		e.preventDefault()
		setChannelId(e.target.id)
	}

    useEffect(() => {
        if (user) {
            getOneChannel(user, channelId)
				.then((res) => {
					setCurrentChannel(res.data.channel)
					setThreadIds(res.data.channel.threads)
					console.log('reset current channel and threads ran')
				})
				.catch(err => {
                    setError(true)
                })
        }
	}, [channelId, refreshThreads])

	//! TESTING moving all of this functionality into another .then on the above useEffect
	useEffect(() => {
		// console.log('currentChannel threads: ', threadIds)
		if (threadIds && user) {
			let threadString = threadIds.toString()
			// console.log('threadString', threadString)
			getThreadsFromChannels(user, threadString)
				.then(res => setThreads(res.data.threads))
				.catch(err => {
					setError(true)
				})
		}
	}, [currentChannel, threadIds, channelId])

	const onChange = (e) => {
        e.persist()

        setMessage(prevMessage => {
            const updatedName = e.target.name
            let updatedValue = e.target.value 

            // console.log('input type: ', e.target.type)

            const updatedMessage = {
                [updatedName] : updatedValue
            }

            // console.log('the channel :', updatedMessage)
            
            return {
                ...prevMessage, ...updatedMessage
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log('current channel before message create: ', currentChannel)
        createMessage(user, message)
			.then(res => {
				// console.log('user after create message', user)
                createThread(user, res.data.message)
					.then(res => {
						// console.log('user after create thread: ', user)
						addThreadToChannel(user, currentChannel._id, res.data.thread._id)
							.then(res => {
							// console.log('user after add thread', user)
							setRefreshThreads(prev => !prev)
							// getOneChannel(user, currentChannel._id)
							// 	.then(res => {
							// 		// console.log('user after get channel', user)
							// 		// console.log('res.data', res.data)
									
							// 	})
							// 	.catch(err => {
							// 		msgAlert({
							// 			heading: 'Error',
							// 			message: 'error getting channel',
							// 			variant: 'danger'
							// 		})
							// 	})
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
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Message sent successfully',
                    variant: 'success'
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