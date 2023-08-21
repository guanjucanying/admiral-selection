import { ASRequest1 } from '../request'

export function login(user_name, password) {
    return ASRequest1.post({
        url: "/user/login",
        data: {
            user_name,
            password
        }
    })
}

