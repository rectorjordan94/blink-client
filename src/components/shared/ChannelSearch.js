import { Form } from 'react-bootstrap'
import { useState, useEffect, useReducer } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { getAllChannels } from '../../api/channels'

const ChannelSearch = (props) => {
    const { user, channelId, setChannelId, msgAlert, refreshChannels } = props
    const [selected, setSelected] = useState([])
    const [options, setOptions] = useState(null)



    useEffect(() => {
        console.log('!!!!!!!!!!!search options refreshed!!!!!!!!!!!!')
        getAllChannels(user)
            .then(res => setOptions(res.data.channels))
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'Error setting search options',
                    variant: 'danger'
                })
            })
    }, [refreshChannels])

    useEffect(() => {
        // console.log('options: ', options)
        // setChannelId(selected.id)
        // console.log('selected: ', selected[0]._id)
        //! POSSIBLY NEED TO CHANGE LOGIC HERE SO THAT IT DOESN'T SET CHANNEL ID TO A CHANNEL THE USER IS NOT A MEMBER OF, IF USER IS NOT A MEMBER DISPLAY A MESSAGE SAYING THAT USER IS NOT A MEMBER AND TO CONTACT THE OWNER OF THE CHANNEL TO REQUEST TO JOIN?????
        if (selected.length > 0) {
            console.log('selected: ', selected[0]._id)
            setChannelId(selected[0]._id)
        }
    }, [selected])


    if (!options) {
        return (
            <p>....</p>
        )
    }


    return (
        <>
            <Form.Group>
                <Typeahead
                    id="channel-search"
                    labelKey="name"
                    onChange={setSelected}
                    options={options}
                    placeholder="Search for a channel..."
                    selected={selected}
                />
            </Form.Group>
        </>
        
    )
}

export default ChannelSearch