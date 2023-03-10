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

export const getOneChannel = (user, channelId) => {
    return axios({
        url: `${apiUrl}/channels/${channelId}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const addThreadToChannel = (user, channelId, threadId) => {
    console.log('channelId in axios call: ', channelId)
    console.log('threadId in axios call: ', threadId)
    return axios({
        url: `${apiUrl}/channels/thread/${channelId}/${threadId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}