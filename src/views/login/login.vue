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
            <div class="nav"><span>密码: </span><input type="password" v-model="password" placeholder="请输入六位密码"></div>
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
        <div class="registerCurtain" v-show="registerShow">
                <div class="nick_name nav">用户昵称: <input type="text" placeholder="请输入用户昵称" v-model="nick_name"></div>
                <div class="user_name nav">用户名称: <input type="text" placeholder="请输入用户名称" v-model="user_name"></div>
                <div class="password nav">用户密码: <input type="password" placeholder="请输入用户密码" v-model="password"></div>
                <div class="payKey nav">支付密码: <input type="password" placeholder="请输入6位支付密码" v-model="payKey"></div>
                <div class="registerAck" @click="registerCurtain">注册</div>
        </div>
        <div class="curtain" v-show="registerCurtainShow" @click="errorRegister">
            <div class="text">
                {{ msg }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from "../../service/modules/login"

let show = ref(false)
let registerShow = ref(false)
let registerCurtainShow = ref(false)
let account = ref()
let password = ref()
let nick_name = ref()
let user_name = ref()
let payKey = ref()
let access_token = ref()
let refresh_token = ref()
let msg = ref()
const router = useRouter()

const registerCurtain = () => {
    let data = {
        'nick_name': nick_name.value,
        'user_name': user_name.value,
        'password': password.value,
        'key':payKey.value
    }
    register(data).then(res => {
        msg.value = res.msg
        if(res.code == 0) {
            nick_name = ""
            user_name = ""
            password = ""
            payKey = ""
            registerShow.value = false
        } else {
            registerCurtainShow.value = true
        }
    })
}

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

let data = {
    'user_name': account,
    password
}

const askRegister = () => {
    registerShow.value = true
    // console.log(nick_name,user_name,password, payKey)
    // register(data).then(res => {
    //     console.log(res)
    // })
}

const errorRegister = () => {
    registerCurtainShow.value = false
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
        // width: 50vh;
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
    .registerCurtain {
        position: absolute;
        display: flex;
        flex-direction: column;
        color: var(--primary-color);
        margin-top: 100px;
        height: 70%;
        width: 100%;
        z-index: 999;
        font-size: 20px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        .nav {
            margin-bottom: 10px;
            input {
                color: black;
            }
        }
        .registerAck {
            width: 200px;
            height: 50px;
            margin-top: 50px;
            line-height: 50px;
            font-size: 30px;
            border-radius: 25px;
            text-align: center;
            color: white;
            background-color: var(--primary-color);
        }
    }
}

</style>