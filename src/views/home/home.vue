<template>
    <div class="home">
        <home-nav-bar></home-nav-bar>
        <div class="banner">
            <img src="@/assets/img/home/banner.png" alt="">
        </div>
        <home-search-box></home-search-box>
    </div>
</template>

<script setup>
    import homeNavBar from './cpns/home-nav-bar.vue';
    import homeSearchBox from './cpns/home-search-box.vue'
</script>

<style lang="less" scoped>
.banner {
    img {
        width: 100%;
        // height: 100px;
    }
}

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
</style>