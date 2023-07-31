import { defineStore } from 'pinia'
import { getHomeHotSuggests, getHomeCategories, getHouseList } from '../../service'

const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: [],
        currentPage: 1,
        houselist: []
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHouseListData() {
            const res = await getHouseList(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore