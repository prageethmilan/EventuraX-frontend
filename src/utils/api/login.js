import * as authService from '../../services/authService'

export const loginUser = async (data) => {
    let result = null
    await authService.loginUser(data)
        .then(async res => {
            console.log(res)
        })
    return result
}

export const socialLogin = async (data) => {
    let result = null
    await authService.socialLogin(data)
        .then(async res => {
            console.log(res)
        })
    return result
}