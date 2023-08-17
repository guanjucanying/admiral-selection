import { ASRequest1 } from '../../service/request'

export function getUserInfo() {
    return ASRequest1.get({
        url: "/user/show_info"
    })
}