<template>
    <div class="home">
        <home-nav-bar></home-nav-bar>
        <div class="banner">
            <img src="@/assets/img/home/banner.png" alt="">
        </div>
        <div class="location">
            <div class="city">广州</div>
            <div class="position">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
    import homeNavBar from './cpns/home-nav-bar.vue';
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
        
        .text {
            font-size: 16px;
        }

        img {
            width: 18px;
            height: 18px;
            margin-left: 5px;
        }
    }
}
</style>