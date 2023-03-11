import apiUrl from '../apiConfig'
import axios from 'axios'

export const createProfile = (user, profileInfo) => {
    // console.log('user in axios call: ', user)
    // console.log('profileInfo in axios call', profileInfo)
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

export const addProfileToUser = (user, profile) => {
    // console.log('profile in axios call: ', profile)
    return axios({
        method: 'PATCH',
        url: `${apiUrl}/profiles/${profile._id}/${user._id}`,
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { profile: profile }
    })
}

//! NEED TO ADJUST ROUTE ON BACKEND, POSSIBLY CREATE A ROUTE THAT JUST UPDATES THE USER TO ADD THE PROFILE TO IT 