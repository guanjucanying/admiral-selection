import asRequest from '../request'

export function getCityAll() {
    return asRequest.get({
        url: "/city/all"
    })
}