import apiUrl from '../apiConfig'
import axios from 'axios'

export const createThread = (user, newThread) => {
    return axios({
        url: `${apiUrl}/threads`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            thread: { firstMessage: newThread._id }
        }
    })
}

export const getThreadsFromChannels = (user, threads) => {
    // console.log('threads in axios call', threads)
    return axios({
        url: `${apiUrl}/threads/channel?threads=${threads}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}

export const getOneThread = (user, threadId) => {
    return axios({
        url: `${apiUrl}/threads/${threadId}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const removeThreads = (user, threadId, channelId) => {
    return axios({
        url: `${apiUrl}/threads/${threadId}/${channelId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}