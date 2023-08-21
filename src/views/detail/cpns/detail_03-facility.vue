<template>
    <div class="facility" >
        <detail-section title="房屋设施" more-text="查看全部设施">
            <div class="facility-inner">
                <template v-for="(item, index) in houseFacility.houseFacilitys" :key="index">
                    <div class="item" v-if="houseFacility.facilitySort?.includes(index)">
                        <div class="head">
                            <img :src="item.icon" alt="" class="icon">
                            <div class="text">{{ item.groupName }}</div>
                        </div>
                        <div class="list">
                            <template v-for="(item, indey) in item.facilitys.slice(0,4)" :key="indey">
                                <div class="iten">
                                    <i class="icon_check" icon></i>
                                    <span>{{ item.name }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </detail-section>
    </div>
</template>

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue'

defineProps({
    houseFacility: {
        type: Object,
        default: () => {}
    }
})


</script>

<style lang="less" scoped>
.facility-inner {
    display: flex;
    justify-content: space-between;
    .head {
        .icon {
            width: 30px;
            height: 30px;
        }
        .text {
            margin-top: 5px;
        }
    }
    .list {
        .iten {
            margin-top: 5px;
        }
    }
}
</style>