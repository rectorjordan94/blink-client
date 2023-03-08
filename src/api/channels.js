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

export const CreateChannel = (user, newChannel) => {
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