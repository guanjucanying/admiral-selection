<template>
    <div class="notice">
        <detail-section title="预定须知">
            <div class="notice-inner">
                <template v-for="(item, index) in orderRules" :key="index">
                    <div class="item">
                        <span class="title">{{ item.title }}</span>
                        <span class="intro">{{ item.introduction }}</span>
                        <span class="tip" v-if="item.tips">查看说明</span>
                    </div>
                </template>
            </div>
        </detail-section>
    </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue"

defineProps({
    orderRules: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="less" scoped>
.notice {
    .notice-inner {
        .item {
            font-size: 13px ;
            position: relative;
            margin-top: 10px;
            .title {
                color: gray;
            }
            .intro {
                // display: inline-block   ;
                margin-left: 20px;
            }
            &:nth-child(3){
                .intro {
                    margin-left: 33px;
                }
            }
            .tip {
                position: absolute;
                right: 3px;
            }
        }
    }
}
</style>