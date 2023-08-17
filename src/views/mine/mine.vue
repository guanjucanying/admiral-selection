<template>
    <div class="mine">
        <div class="head">
            <div class="banner">
                <img src="../../assets/img/mine/4_04.jpg" alt="">
            </div>
            <div class="name">
                <p class="nickName">昵称:{{ nick_name }}</p>
                <p class="userName">用户名:{{ user_name }}</p>
            </div>
        </div>
        <div class="content">
            <div class="nav"><span class="manage">个人信息管理</span><span class="symbol">></span></div>
            <div class="nav"><span class="manage">收货地址管理</span><span class="symbol">></span></div>
        </div>
        <div class="footer" @click="exit">
            <span>退出登录</span>
        </div>
    </div>
</template>

<script>
</script>
<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getUserInfo } from '../../service/modules/mine';

const router = useRouter()
let user_name = ref()
let nick_name = ref()

const getInfo = () => {
    getUserInfo().then(res => {
        user_name.value = res.data.user_name
        nick_name.value = res.data.nickname
    })
}

const exit = () => {
    localStorage.clear()
    router.push('/login')
}

onMounted(() => {
    getInfo()
})

</script>


<style lang="less" scoped>
.mine {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--primary-color);
    .head {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .banner {
            width: 80px;
            height: 120px;
            // margin-left: 20px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .name {
            color: black;
            width: 250px;
            .nickName {
                font-size: 25px;
            }
        }
    }
    .content {
        margin-top: 120px;
        width: 100%;
        .nav {
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            width: 100%;
            margin-bottom: 20px;
            border: 1px solid lightgray;
            line-height: 20px;
            .manage {
                margin-top: 5px;
                margin-left: 10px;
            }
            .symbol {
                padding: 5px;
            }
        }
    }
    .footer {
        width: 200px;
        height: 50px;
        margin-top: 180px;
        line-height: 50px;
        font-size: 20px;
        border-radius: 25px;
        text-align: center;
        color: white;
        background-color: var(--primary-color);
    }
}
</style>