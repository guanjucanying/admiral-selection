<template>
    <div class="house-item">
        <div class="item-inner">
            <div class="cover">
                <img :src="itemData.image.url" alt="">
            </div>
        </div>
        <div class="info" style="color: black;">
                <div class="loaction">
                    <img src="@/assets/img/home/location.png" alt="" class="icon-img">
                    <span>{{ itemData.location }}</span>
                </div>
                <div class="name">{{ itemData.houseName }}</div>
                <div class="summary">{{ itemData.summaryText }}</div>
                <div class="price">
                    <div class="new">{{ "￥" + itemData.finalPrice }}</div>
                    <div class="old">{{ "￥" + itemData.productPrice }}</div>
                    <div class="tip" v-if="itemData.priceTipBadge">{{ itemData.priceTipBadge.text }}</div>
                </div>
        </div>
    </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
    itemData: {
        type: Object,
        default: () => ({})
    }
})

const itemScore = computed(() => {
    return Number(props.itemData.commentScore)
})

</script>

<style lang="less" scoped>
.house-item {
    width: 50%;
    position: relative;
    overflow: hidden;
    // height: 200%;
    .item-inner {
        position: absolute;
        margin: 5px;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;

        .cover {
            img {
                width: 100%;
            }
        }
    }
    .info {
            position: absolute;
            bottom: 0;
            // top: 40px;
            padding: 8px 10px;
            color: #fff;

            .icon-img {
                width: 15px;
                height: 15px;
            }
            .summary {
                font-size: 12px;
            }

            .name {
                margin: 5px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            
            .price {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }
            .new {
                font-size: 18px;
                color: var(--primary-color);
            }
            .old {
                text-decoration:line-through
            }
            .tip {
                color: #fff;
                background-color: lightcoral;
                border-radius: 10px;
                padding: 2px;
            }
        }
}
</style>