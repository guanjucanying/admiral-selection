<template>
    <div class="landlord">
        <detail-section title="房东介绍" more-text="查看房东主页">
            <div class="intro">
                <div class="top">
                    <img :src="landlord.topScroll" alt="">
                </div>
                <div class="header">
                    <div class="left">
                        <div class="avator">
                            <img :src="landlord.hotelLogo" alt="">
                        </div>
                        <div class="info">
                            <div class="name">{{ landlord.hotelName }}</div>
                            <div class="tags">
                                <template v-for="(item, index) in landlord.hotelTags">
                                    <div class="item" :style="{ color: item.tagText.color }">
                                        <span>{{ item.tagText.text }}</span>
                                        <span v-if="index !== landlord.hotelTags.length - 1" class="divider">|</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="right">
                            <div class="contact">联系房东</div>
                        </div>
                    </div>
                    <div class="bottom">
                        <template v-for="(item, index) in landlord.hotelSummary">
                            <div class="item">
                                <div class="title">{{ item.title }}</div>
                                <div class="score">{{ item.introduction }}</div>
                                <div class="desc">{{ item.tip }}</div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </detail-section>        
    </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue"

defineProps({
    landlord: {
        type: Object,
        default: () => ({})
    }
})

</script>

<style lang="less" scoped>
.intro {
    .top {
       img {
        width: 100%;
       }
    }
    .header {
        padding: 10px 0;
        .left {
            display: flex;
            justify-content: space-between;
            .avator {
                img {
                    width: 50px;
                    height: 50px;
                }
            }
            .info{
                padding-top: 8px;
                .name {
                    font-size: 20px;
                }
                .tags{
                    display: flex;
                }
            }
        }
        .right {
            margin-top: 15px;
            .contact {
                padding: 2px 0;
                text-align: center;
                width: 80px;
                height: 20px;
                margin-left: 10px;
                color: aliceblue;
                border-radius: 5px;
                background-color: var(--primary-color);
            }
        }
    }
    .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        .item {
            color: gray;
            .score {
                font-size: 20px;
                color: black;
            }
        }
    }
}
</style>