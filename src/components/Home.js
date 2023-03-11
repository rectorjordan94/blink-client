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
	const { msgAlert, user, socket, currentChannel, setCurrentChannel } = props
	// console.log('user in home', user)
	// console.log('props in home', props)
	const [error, setError] = useState(false)
	const [channelId, setChannelId] = useState("")
	// const [currentChannel, setCurrentChannel] = useState(null)
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
		<div className="container-fluid px-0" >
			<div className="row g-0 flex-nowrap">
				<ChannelSidebar msgAlert={msgAlert} user={user} channelId={channelId} onClick={onClick} />
				<MessageArea message={message} handleChange={onChange} handleSubmit={onSubmit}  socket={socket} currentChannel={currentChannel} threads={threads} user={user} msgAlert={msgAlert}  />
			</div>	
		</div>
	)
}

export default Home

// triggerRefresh={() => setThreads(prev => !prev) }

// "640a870aeab8a04f120e31d4",
//                 "640a86f5eab8a04f120e31d1",
//                 "640b48185084d30b2da48988",
//                 "640b486e5084d30b2da489b7",
//                 "640b48d05084d30b2da489d9",
//                 "640b58d4f3b9e40c9eb749b2",
//                 "640b5978f3b9e40c9eb749e2",
//                 "640b5b328350dd841c5115ea",
//                 "640b5b4d8350dd841c511600",
//                 "640b5b878350dd841c511616",
//                 "640b5bb22f074883091dee33",
//                 "640b76e9b50695c75bd4f305",
//                 "640b77deb50695c75bd4f329",
//                 "640b7818b50695c75bd4f34f",
//                 "640b797db50695c75bd4f385",
//                 "640b79c8b50695c75bd4f3d3",
//                 "640b79f4b50695c75bd4f3f9",
//                 "640b7b28d41699d9cfb97d10",
//                 "640b7b78d41699d9cfb97dd0",
//                 "640b7be8d41699d9cfb97de8",
//                 "640b7c38d41699d9cfb97e0e",
//                 "640b7c8ed41699d9cfb97e26",
//                 "640b7cd2d41699d9cfb97e3e",
//                 "640b7ce3d41699d9cfb97e56",
//                 "640b7d07d41699d9cfb97e7b",
//                 "640b7d3fd41699d9cfb97e9f",
//                 "640b7d68d41699d9cfb97eb7",
//                 "640b7e31d41699d9cfb97f5e",
//                 "640b7e5ed41699d9cfb97f83",
//                 "640b7e7cd41699d9cfb97fa9",
//                 "640b7f4cd41699d9cfb98067",
//                 "640b8148d41699d9cfb9cdb9",
//                 "640b8150d41699d9cfb9cdcf",
//                 "640b81b0d41699d9cfb9cddb",
//                 "640b81dad41699d9cfb9cdf3",
//                 "640b81edd41699d9cfb9ce09",
//                 "640b8233d41699d9cfb9ce57",
//                 "640b8236d41699d9cfb9ce6d",
//                 "640b82bfd41699d9cfb9ce8f",
//                 "640b85dec013aedd129acf77",
//                 "640b86b7c013aedd129ad065",
//                 "640b86fec013aedd129ad0ad",
//                 "640b873fc013aedd129ad0ff",
//                 "640b877bc013aedd129ad13b",
//                 "640b87f0807c92565d3388aa",
//                 "640b882749e24073693343fe",
//                 "640b88c277d80b169e6d86d2",
//                 "640b89128aaa401aef07a085",
//                 "640b897fc44d1ec1676ab1bb",
//                 "640b8a1fc44d1ec1676aceb7",
//                 "640b8a8580c90dd4be80d3c0",
//                 "640b8ae880c90dd4be80d3ee",
//                 "640b8b3a11720cc6b3ea911d",
//                 "640b8bb211720cc6b3ea914d",
//                 "640b8d33e795a01505322440",
//                 "640b8d92e795a01505322604",
//                 "640b8e5fe795a0150532264c",
//                 "640b8f50e795a015053226dc",
//                 "640b8f55e795a015053226fa",
//                 "640b980ee795a0150532278f",
//                 "640b9858e795a01505322863",
//                 "640b989ce795a015053228ab",
//                 "640b98e73763d92f4f376854",
//                 "640b99193763d92f4f3768d0",
//                 "640b99572ae6e2179039db8e",
//                 "640b99a52ae6e2179039dbd6",
//                 "640b99e3911503d406b47f28",
//                 "640b99ea911503d406b47f8c",
//                 "640b9a21911503d406b481b4",
//                 "640b9adb911503d406b482c6",
//                 "640b9b06911503d406b48332",
//                 "640b9b4d911503d406b483ca",
//                 "640b9b54911503d406b4842e",
//                 "640b9cffbfda9fcb07502b76",
//                 "640b9d52bfda9fcb07502bf2",
//                 "640b9d8ebfda9fcb07502c8a",
//                 "640b9f3f2e9cd4e14267b815",
//                 "640b9fcf2e9cd4e14267b8d9",
//                 "640ba0562e9cd4e14267b9a1",
//                 "640ba28e2e9cd4e14267ba21",
//                 "640ba3452e9cd4e14267bab9",
//                 "640ba3e22e9cd4e14267bb5b",
//                 "640ba5342e9cd4e14267be73",
//                 "640ba5592e9cd4e14267bec1",
//                 "640ba694c94e80d1e7918318",
//                 "640ba70bc94e80d1e7918384",
//                 "640ba845c94e80d1e791842c",
//                 "640ba8adc94e80d1e791849c",
//                 "640ba924c94e80d1e791854e",
//                 "640ba92bc94e80d1e7918564",
//                 "640bde4c37d93dee5b2acac1",
//                 "640cc5ba6082e26fe29228ef",
//                 "640cc5bb6082e26fe29228ff",
//                 "640ccf905825ae517758424a",
//                 "640cd01762599387caac570d"