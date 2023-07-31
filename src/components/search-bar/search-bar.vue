<template>
    <div class="search-bar">
            <div class="left">
                <div class="excellent">优选获取</div>
            </div>
            <div class="content">
                <div class="keyword">
                    <span class="date">{{ startDateStr }}</span>
                    <span class="date">{{ endDateStr }}</span>
                    关键字</div>
            </div>
            <div class="right">
                <i class="icon-search"></i>
            </div>
    </div>
</template>

<script setup>
import useMainStore from '../../stores/modules/main';
import { storeToRefs } from 'pinia'
import {computed} from 'vue'
import { formatMonthDay } from "@/utils/format_date"

const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)
const startDateStr = computed(() => formatMonthDay(startDate.value,"MM.DD"))
const endDateStr = computed(() => formatMonthDay(endDate.value,"MM.DD"))
</script>

<style lang="less" scoped>
.search-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    line-height: 15px;
    .left {
        width: 20px;
        height: 33px;
        margin-left: 5px;
        min-width: 30px;
        color:var(--primary-color);
        // background: #f2f4f6;
    }
    .content {
        height: 30px;
        width: 100%;
        line-height: 30px;
        margin: 0 10px;
        color: gray;
        background: #f2f4f6;
    }
    .right {
        // margin-left: 80px;
        width: 24px;
        height: 24px;
        display: inline-block;
        background-image: url(../../assets/img/home/home-sprite.png);
        background-position: -29px -151px;
        background-size: 207px 192px;
    }
}
</style>