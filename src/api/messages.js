import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMessage = (user, newMessage) => {
    console.log('user in createMessage axios call: ', user)
    return axios({
        url: `${apiUrl}/messages`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            message: newMessage
        }
    })
}