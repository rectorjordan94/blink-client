import apiUrl from '../apiConfig'
import axios from 'axios'

export const createProfile = (user, profileInfo) => {
    console.log('user in axios call: ', user)
    console.log('profileInfo in axios call', profileInfo)
	return axios({
		method: 'POST',
        url: apiUrl + '/profiles',
        headers: {
            Authorization: `Token token=${user.token}`
        },
		data: {
			profile: {
				username: profileInfo.username,
				fullName: profileInfo.fullName,
                location: profileInfo.location,
                pronouns: profileInfo.pronouns,
			},
		},
	})
}