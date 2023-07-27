<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex">
            <template v-for="(item, index) in tabarData">
                <van-tabbar-item :to="item.path">
                <span>{{ item.text }}</span>
                <template #icon>
                    <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                    <img v-else :src="getAssetURL(item.imageActive)" alt="">
                </template>
            </van-tabbar-item>
            </template>
        </van-tabbar>

    </div>
</template>

<script setup>

    import tabarData from "@/assets/data/tabbar.js"
    import { getAssetURL } from "@/utils/load_assets.js"
    import { ref } from "vue"

    const currentIndex = ref(0)

</script>

<style lang="less" scoped>
.tab-bar {
    img {
        height: 30px;
    }
}
</style>