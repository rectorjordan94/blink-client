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