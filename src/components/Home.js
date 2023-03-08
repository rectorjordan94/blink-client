import ChannelSidebar from "./shared/ChannelSidebar"
import MessageArea from "./message/MessageArea"
import ProfileSidebar from "./profile/ProfileSidebar"


const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<div className="container mx-0">
			<div className="row">
				<ChannelSidebar msgAlert={msgAlert} user={user} className="col-lg-2"/>
				<MessageArea className="col-lg-8"/>
				<ProfileSidebar className="col-lg-2" />
			</div>
		</div>
	)
}

export default Home
