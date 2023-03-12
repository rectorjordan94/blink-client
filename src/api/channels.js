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
    // console.log('channelId in axios call: ', channelId)
    // console.log('threadId in axios call: ', threadId)
    return axios({
        url: `${apiUrl}/channels/thread/${channelId}/${threadId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const updateChannel = (user, channel) => {
    return axios({
        url: `${apiUrl}/channels/${channel._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            channel: channel
        }
    })
}

export const removeChannel = (user, channelId) => {
    return axios({
        url: `${apiUrl}/channels/${channelId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}

export const addOrRemoveMember = (user, channel, addOrRemove, newMember) => {
    return axios({
        url: `${apiUrl}/channels/${channel._id}/${addOrRemove}/${newMember}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}