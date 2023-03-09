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
            thread: newThread
        }
    })
}

export const getThreadsFromChannels = (user, threads) => {
    console.log('threads in axios call', threads)
    return axios({
        url: `${apiUrl}/threads/channel?threads=${threads}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}