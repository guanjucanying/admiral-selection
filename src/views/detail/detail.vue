<template>
    <div class="detail top-page">
        <van-nav-bar 
        title="房屋详情" 
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="main" v-if="mainPart">
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
            <detail-infos :top-infos="mainPart.topModule"/>
        </div>
    </div>
</template> 

<script setup>
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import { ref, computed } from 'vue'
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


</script>

<style lang="less" scoped>
// .detail { 
//     color: var(--primary-color);
// }
</style>