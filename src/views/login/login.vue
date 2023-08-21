<template>
    <div class="inner">
        <div class="header">
            <div class="banner">
                <h2>上将优选</h2>
            </div>
            <div class="imgDiv">
                <img src="../../assets/img/login/login.png" alt="">
            </div>
        </div>
        <div class="inputSection">
            <div class="nav"><span>用户: </span><input type="text" v-model="account" placeholder="请输入用户名称"></div>
            <div class="nav"><span>密码: </span><input type="password" v-model="password" placeholder="请输入密码"></div>
        </div>
        <div class="btnSection">
            <div class="register nav" @click="askRegister">注册</div>
            <div class="login nav" @click="askLogin">登录</div>
        </div>
        <div class="curtain" v-show="show" @click="errorLogin">
            <div class="text">
                请输入正确的用户和密码
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from "../../service/modules/login"

let show = ref(false)
let account = ref()
let password = ref()
let access_token = ref()
let refresh_token = ref()
const router = useRouter()


const askLogin = () => {
    login(account.value, password.value).then(res => {
        if(res.code == 0) {
            access_token = res.data.access_token
            refresh_token = res.data.refresh_token
            localStorage.setItem('access_token',access_token)
            localStorage.setItem('refresh_token', refresh_token)
            router.push('/home')
        } else {
            show.value = true
        }
    })
}

const askRegister = () => {
    router.push('/register')
}


const errorLogin = () => {
    show.value = false
}


</script>

<style lang="less" scoped>
.inner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .header {
        .banner {
            text-align: center;
            padding-left: 20px;
            margin-bottom: 80px;
            font-size: 20px;
            color: var(--primary-color);
        }
        .imgDiv {
            margin-left: 20px;
            img {
                width: 200px;
            }
        }
    }
    .inputSection {
        margin: 40px;
        color: var(--primary-color);
        font-size: 18px;
        .nav {
            margin-bottom: 20px;
            input {
                color: black;
            }
        }
    }
    .btnSection {
        color: lightgoldenrodyellow;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        .nav {
            width: 150px;
            height: 40px;
            text-align: center;
            font-size: 25px;
            border-radius: 25px;
            line-height: 39px;
            background-color: var(--primary-color);
        }
        .register {
            margin-right: 40px;
        }
    }
    .curtain {
        position: absolute;
        color: var(--primary-color);
        height: 100%;
        width: 100%;
        z-index: 999;
        font-size: 30px;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

</style>