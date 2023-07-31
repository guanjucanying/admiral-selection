<template>
    <div class="home">
        <home-nav-bar></home-nav-bar>
        <div class="banner">
            <img src="@/assets/img/home/banner.png" alt="">
        </div>
        <home-search-box />
        <home-categories />
        <div class="search-bar" v-if="isShowSearchBar">
            <search-bar :start-date="'09.19'" :end-date="'09.20'"/>
        </div>
        <home-content/>
        <!-- <button @click="moreBtnClick">加载更多</button> -->
        <!-- <home-search-input></home-search-input> -->
    </div>
</template>

<script setup>
    import { watch, computed } from 'vue';
    import homeNavBar from './cpns/home-nav-bar.vue';
    import homeSearchBox from './cpns/home-search-box.vue'
    import homeCategories from './cpns/home-categories.vue'
    import homeContent from './cpns/home-content.vue'
    import searchBar from '@/components/search-bar/search-bar.vue';
    // import homeSearchInput from './cpns/home-search-input.vue'
    // import asRequest from '@/service/request/index'
    import useHomeStore from '../../stores/modules/home';
    import useScroll from '@/hooks/useScroll'

    // const hotSuggests = ref([])
    // asRequest.get({
    //     url: "/home/hotSuggests"
    // }).then(res => {
    //     hotSuggests.value = res.data
    // })
    const homeStore = useHomeStore()
    homeStore.fetchHotSuggestData()
    homeStore.fetchCategoriesData()
    // let currentPage = 1
    homeStore.fetchHouseListData()

    // const moreBtnClick = () => {
    //     console.log("加载更多")  
    //     homeStore.fetchHouseListData()
    // }
// const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     if(clientHeight + scrollTop >= scrollHeight) {
//         homeStore.fetchHouseListData()
//     }
// }

// onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler)   
// })

// // onActivated(() => {

// // })

// onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler)
// })
// useScroll(() => {
//     homeStore.fetchHouseListData()
// })
const { isReachBottom, scrollTop} = useScroll()
watch(isReachBottom, (newValue) => {
    if(newValue) {
        homeStore.fetchHouseListData().then(() => {
            isReachBottom.value = false
        })
    }
})

// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//     isShowSearchBar.value = newTop > 100
// })
const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
})


</script>

<style lang="less" scoped>
.home {
    padding-bottom: 60px; 
}
.banner {
    img {
        width: 100%;
    }
}
.search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
    z-index: 9;
}

</style>