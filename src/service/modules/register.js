import { ASRequest1 } from "../request"

export function register(data) {
    return ASRequest1.post({
        url: 'user/register',
        data
    })
}