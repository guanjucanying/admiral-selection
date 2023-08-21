import { ASRequest1 } from '../../service/request'

export function getUserInfo() {
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')
    return ASRequest1.get({
        url: "/user/show_info",
        headers: {
            'access_token': access_token,
            'refresh_token': refresh_token
        }
    })
}

export function changeUserInfo(nick_name, user_id) {
    return ASRequest1.put({
        url: "/user/update",
        data: {
            nick_name,
            user_id
        }
    })
}

export function getAddressList() {
    return ASRequest1.get({
        url: "/addresses/list"
    })
}

export function saveChangeAddress(id, name, phone, address) {
    return ASRequest1.put({
        url: '/addresses/update/',
        data: {
            id,
            name,
            phone, 
            address
        }
    })
}

export function delAddress(id) {
    return ASRequest1.delete({
        url: "/addresses/delete",
        params:{
            id
        }
    })
}

export function createAddress(name, phone, address) {
    return ASRequest1.post({
        url: "/addresses/create",
        data: {
            name,
            phone,
            address
        }
    })
}