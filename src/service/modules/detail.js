import asRequest from '../request'

 export function getDetailInfos(houseId) {
    return asRequest.get({
        url: "/detail/infos",
        params: {
            houseId
        }
    })
 }