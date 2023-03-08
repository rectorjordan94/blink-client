import ChannelSidebar from "./shared/ChannelSidebar"
import MessageArea from "./message/MessageArea"
import ProfileSidebar from "./profile/ProfileSidebar"

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<ChannelSidebar msgAlert={msgAlert} user={user} />
			<MessageArea />
			<ProfileSidebar />
		</>
	)
}

export default Home
