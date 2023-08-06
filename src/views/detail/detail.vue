<template>
    <div class="detail top-page" ref="detailRef">
        <tab-control 
        v-if="showTabControl"
        class="tabs"
        :titles="names"
        @tabItemClick="tabClick"
        ref="tabControlRef"
        />
        <van-nav-bar 
        title="房屋详情" 
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
            <div class="main" v-if="mainPart" v-memo="[mainPart]">
                <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
                <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"/> 
                <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
                <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
                <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
                <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
            </div>
    </div>
</template> 

<script setup>
import TabControl from "@/components/tab-control/tab-control.vue"
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailNotice from './cpns/detail_05-notice.vue'
import DetailMap from './cpns/detail_06-map.vue'
import useScroll  from '@/hooks/useScroll.js'

import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getDetailInfos } from '@/service';

const router = useRouter()
const route = useRoute()
const houseId = route.params.id

const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
})

const onClickLeft = () => {
    router.back()    
}

const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
    // console.log(scrollTop.value)
    return scrollTop.value > 450
})

// const landlordRef = ref()
// const sectionEls = []
// const getSectionRef = (value) => {
//     sectionEls.push(value.$el)
// }
const sectionEls = ref({})
const names = computed(() => {
    return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
    // sectionEls.push(value.$el)
    if(!value) return
    const name = value.$el.getAttribute("name")
    sectionEls.value[name] = value.$el
}  

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    let distance = el.offsetTop
    if(index !== 0) {
        distance -= 44
    }
    isClick = true
    currentDistance = distance
    detailRef.value.scrollTo({
        top: distance,
        behavior: "smooth"
    })
}

const tabControlRef = ref()
watch(scrollTop, (newValue) => {
    if(newValue === currentDistance) {
        isClick = false
    }
    if(isClick)  return
    const els = Object.values(sectionEls.value)
    const values = els.map(el => el.offsetTop)
    // console.log(values)
    let index = values.length - 1
    for(let i = 0; i < values.length; i++) {
        if(newValue + 70 < values[i]) {
            index = i - 1
            break
        } 
    }
    // console.log(index)
    tabControlRef.value?.setCurrentIndex(index)
})
</script>

<style lang="less" scoped>
.tabs {
    position: fixed;
    z-index: 9;
    background-color: #fff;
    left: 0;
    right: 0;
    top: 0;
}
</style>