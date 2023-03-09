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