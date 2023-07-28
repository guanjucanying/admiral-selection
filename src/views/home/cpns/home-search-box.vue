<template>
        <div class="location">
            <div class="city" @click="cityClick">广州</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt=""> 
            </div>
        </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter()

    const positionClick = () => {
        navigator.geolocation.getCurrentPosition((res) => {
            console.log("获取位置成功",res)
        }, err => {
            console.log("获取位置失败",err)
        })
    }

    const cityClick = () => {
        router.push("/city")
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
</style>