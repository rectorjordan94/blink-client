import Container from 'react-bootstrap/Container'
import ChannelsIndex from '../channels/ChannelsIndex'

const ChannelSidebar = (props) => {
    const { msgAlert, user } = props



    return (
        <Container>
            < ChannelsIndex msgAlert={msgAlert} user={user} />
        </Container>
    )
}

export default ChannelSidebar