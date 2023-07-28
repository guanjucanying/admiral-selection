<template>
    <div class="city top-page">
        <div class="top">
            <van-search 
            v-model="searchValue" 
            placeholder="城市/区域/位置" 
            shape="round"
            show-action
            @cancel="cancelClick"
            />
            
            <van-tabs v-model:active="tabActive" color="#ff9854">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <div class="content">
            <!-- <city-group :group-data="currentGroup"/> -->
            <template v-for="(value, key, index) in allCities" :key="index">
                <city-group v-show="tabActive === key" :group-data="value">
                    {{ value.title }}
                </city-group>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia';

import CityGroup from './cpns/city-group.vue'

const router = useRouter()

const searchValue = ref("")
const cancelClick = () => {
    router.back()
}
const tabActive = ref()


const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style lang="less" scoped>

.city {
    // .top {
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    // }
    // .content {
    //     margin-top: 54px;
    // }
    .top {
        position: relative;
        z-index: 9;
    }
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
}

</style>