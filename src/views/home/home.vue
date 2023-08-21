<template>
    <div class="home" ref="homeRef">
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
    </div>
</template>

<script>
    export default { name: "home" }
</script>
<script setup>
    import { watch, computed, ref, onActivated } from 'vue';
    import homeNavBar from './cpns/home-nav-bar.vue';
    import homeSearchBox from './cpns/home-search-box.vue'
    import homeCategories from './cpns/home-categories.vue'
    import homeContent from './cpns/home-content.vue'
    import searchBar from '@/components/search-bar/search-bar.vue';
    import useHomeStore from '../../stores/modules/home';
    import useScroll from '@/hooks/useScroll'

    const homeStore = useHomeStore()
    homeStore.fetchHotSuggestData()
    homeStore.fetchCategoriesData()
    homeStore.fetchHouseListData()

const homeRef = ref()
const { isReachBottom, scrollTop} = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
    if(newValue) {
        homeStore.fetchHouseListData().then(() => {
            isReachBottom.value = false
        })
    }
})

const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
})

//记录回来的值
onActivated(() => {
    homeRef.value?.scrollTo({
        top: scrollTop.value
    })
})

</script>

<style lang="less" scoped>
.home {
    box-sizing: border-box;
    height: 100vh;
    overflow-y: auto;
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