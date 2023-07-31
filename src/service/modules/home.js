import asRequest from '../request'
export function getHomeHotSuggests() {
    return asRequest.get({
        url: "/home/hotSuggests"
    })
}

export function getHomeCategories() {
    return asRequest.get({
        url: "/home/categories"
    })
}

export function getHouseList(currentPage) {
    return asRequest.get({
        url: "/home/houselist",
        params: {
            page: currentPage
        }
    })
}