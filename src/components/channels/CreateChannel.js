import { useState } from 'react'
import { createChannel } from '../../api/channels'
import ChannelForm from '../shared/ChannelForm'

import { useNavigate } from 'react-router-dom'

const CreateChannel = (props) => {

    const { user, msgAlert, setRefreshChannels } = props
    const navigate = useNavigate()
    // console.log('this is navigate: ', navigate)

    const [channel, setChannel] = useState({})

    const onChange = (e) => {
        e.persist()

        setChannel(prevChannel => {
            const updatedName = e.target.name
            let updatedValue = e.target.value 

            console.log('input type: ', e.target.type)

            const updatedChannel = {
                [updatedName] : updatedValue
            }

            console.log('the channel :', updatedChannel)
            
            return {
                ...prevChannel, ...updatedChannel
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createChannel(user, channel)
            // nav to the show page
            .then(() => { setRefreshChannels(prev => !prev)})
            .then(res => { navigate('/') })
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Channel created successfully',
                    variant: 'success'
                })
            })
            // if there is an error tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Failed to create channel',
                    variant: 'danger'
                })
            })
    }

    return (
        <ChannelForm
            channel={channel}
            handleChange={onChange}
            handleSubmit={onSubmit}
        />
    )
}

export default CreateChannel