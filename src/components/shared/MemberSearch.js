import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { getAllUsers } from '../../api/auth'
import { addOrRemoveMember } from '../../api/channels'

const MemberSearch = (props) => {
    const { user, msgAlert, currentChannel, triggerRefresh } = props

    const [selected, setSelected] = useState([])
    const [options, setOptions] = useState(null)
    const [newMember, setNewMember] = useState(null)
    const [runAddMember, setRunAddMember] = useState(false)

    useEffect(() => {
        console.log('newMember: ', newMember)
        if (newMember) {
            addOrRemoveMember(user, currentChannel, 'add', newMember)
                .then(() => { 
                    triggerRefresh()
                    console.log('triggerRefresh ran in member search')
                })
                .catch(err => {
                    msgAlert({
                        heading: 'Error',
                        message: 'Unable to add member to channel',
                        variant: 'danger'
                    })
                })
        }
    }, [newMember])


    useEffect(() => {
        getAllUsers(user)
            .then(res => {
                setOptions(res.data.users)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'Error setting search options',
                    variant: 'danger'
                })
            })
    }, [])

    useEffect(() => {
        
        if (selected.length > 0) {
            console.log('selected: ', selected[0]._id)
            // setChannelId(selected[0]._id)
            setNewMember(selected[0]._id)
            // setRunAddMember(prev => !prev)
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
                    id="member-search"
                    labelKey="email"
                    onChange={setSelected}
                    options={options}
                    placeholder="Search for users..."
                    selected={selected}
                />
            </Form.Group>
        </>
        
    )
}

export default MemberSearch