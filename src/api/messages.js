import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMessage = (user, newMessage) => {
    // console.log('user in createMessage axios call: ', user)
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

export const replyToThread = (user, message, thread) => {
    // console.log('user in axios call: ', user)
    return axios({
        url: `${apiUrl}/messages/reply/${thread._id}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            message: message
        }
    })
}

export const removeReply = (user, messageId) => {
    return axios({
        url: `${apiUrl}/messages/${messageId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}