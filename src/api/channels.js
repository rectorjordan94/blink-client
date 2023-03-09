import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllChannels = (user) => {
    return axios({
        url: `${apiUrl}/channels`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const createChannel = (user, newChannel) => {
    return axios({
        url: `${apiUrl}/channels`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            channel: newChannel
        }
    })
}