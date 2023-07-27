import {defineStore} from 'pinia'

const useCommodityStore = defineStore("commodity", {
    state: () => ({
        commodities: []
    }),
    actions: {

    }
})

export default useCommodityStore