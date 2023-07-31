<template>
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt=""> 
            </div>
        </div>

        <div class="section date-range">
            <div class="start">
                <div class="date">
                    <span class="tip">限时抢购</span>
                    <span class="time">{{ startDateStr }}</span>
                </div>
            </div>
            <div class="stay">抢购内容</div>
            <div class="end">
                <div class="date">
                    <span class="tip">结束时间</span>
                    <span class="time">{{ endDateStr }}</span>
                </div>
            </div>
        </div>

        <div class="hot-suggest">
            <div class="title"><span>热门优选地区</span></div>
                <div class="content">
                    <template v-for="(item, index) in hotSuggests" :key="index">
                        <span 
                            class="item"
                            :style="{color: item.tagText.color, background: item.tagText.background.color }"
                        >{{ item.tagText.text }}</span>    
                    </template>
                </div>
        </div>

        <div class="section search-btn">
            <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useCityStore from '../../../stores/modules/city';
import useHomeStore from '@/stores/modules/home'
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { formatMonthDay } from "@/utils/format_date"
import useMainStore from '@/stores/modules/main';

    const router = useRouter()

    defineProps({
        hotSuggests: {
            type: Array,
            default: () => []
        }
    })


    const cityClick = () => {
        router.push("/city")
    }

    const cityStore = useCityStore()
    const { currentCity }  = storeToRefs(cityStore)
    
    const positionClick = () => {
        navigator.geolocation.getCurrentPosition((res) => {
            console.log("获取位置成功",res)
        }, err => {
            console.log("获取位置失败",err)
        })
    }

    const mainStore = useMainStore()
    const { startDate, endDate } = storeToRefs(mainStore)
    // console.log(startDate)
    const startDateStr = computed(() => formatMonthDay(startDate.value))
    // console.log(startDateStr)
    const endDateStr = computed(() => formatMonthDay(endDate.value))
// const nowDate = new Date()
// const newDate = new Date()
// newDate.setDate(nowDate.getDate() + 1)
// const startDateStr = ref(formatMonthDay(startDate))
// console.log(startDateStr)
// const endDate = ref(formatMonthDay(newDate))
// endDate.setDate(startDate.getDate() + 1)


    const homeStore = useHomeStore()
    const { hotSuggests } = storeToRefs(homeStore)

    const searchBtnClick = () => {
        router.push({
            path: "search",
            query: {
                startDate: startDate.value,
                endDate: endDate.value,
                currentCity: currentCity.value.cityName
            }
        })
    }
</script>

<style lang="less" scoped>
.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;


    .city {
        font-size: 16px;
        flex: 1;
    }

    .position {
        width: 88px;
        display: flex;
        align-items: center;
        color: #666;
        
        .text {
            font-size: 14px;
        }

        img {
            width: 18px;
            height: 18px;
            margin-left: 5px;
        }
    }
}

.section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 20px;


    .start {
        display: flex;
        font-size: 16px;
        // flex: 1;

        .date {
            display: flex;
            flex-direction: column;

            .tip {
                color: orange;
            }
        }
    }
    .end {
        display: flex;
        font-size: 14px;
        // flex: 1;

        .date {
            display: flex;
            flex-direction: column;
        }
    }

}

.hot-suggest {
    .title {
        padding: 15px;
        padding-left: 17px;
        padding-bottom: 10px;
        font-size: 16px;
        color: orange;
    }
    .content {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
        .item{
            padding: 5px;
            margin: 7px;
            margin-bottom: 5px;
            margin-left: 15px;
            border-radius: 14px;
            line-height: 1;
        }
    }
}

.search-btn {
    .btn {
        width: 342px;
        height: 38px;
        margin-top: 10px;
        max-height: 50px;
        font-weight: 500px;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}
</style>