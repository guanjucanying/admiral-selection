<template>
    <div class="register">
        <div class="back" @click="backLogin">
            <span>&lt;</span><span>返回登录</span>
        </div>
        <div class="banner">
                <h2>上将优选</h2>
        </div>
        <div class="registerContent">
                <div class="nick_name nav">用户昵称: <input type="text" placeholder="请输入用户昵称" v-model="nick_name"></div>
                <div class="user_name nav">用户名称: <input type="text" placeholder="请输入用户名称" v-model="user_name"></div>
                <div class="password nav">用户密码: <input type="password" placeholder="请输入用户密码" v-model="password"></div>
                <div class="payKey nav">支付密码: <input type="password" placeholder="请输入6位支付密码" v-model="payKey"></div>
                <div class="registerAck" @click="registerAck">注册</div>
        </div>
        <div class="curtain" v-show="registerCurtain" @click="errorRegister">
            <div class="text">
                {{ msg }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from "../../service/modules/register"

let password = ref()
let nick_name = ref()
let user_name = ref()
let payKey = ref()
let msg = ref()
let registerCurtain = ref(false)

const router = useRouter()

const backLogin = () => {
    router.push('/login')
}

const registerAck = () => {
    let data = {
        'nick_name': nick_name.value,
        'user_name': user_name.value,
        'password': password.value,
        'key':payKey.value
    }
    register(data).then(res => {
        msg.value = res.msg
        if(res.code === 0) {
            nick_name = ""
            user_name = ""
            password = ""
            payKey = ""
            router.push('/login')
        } else {
            registerCurtain.value = true
        }
    })
}

const errorRegister = () => {
    registerCurtain.value = false
}

</script>

<style lang="less" scoped>
    .register {
        .back {
            font-size: 15px;
            color: var(--primary-color);
            padding-top: 10px;
            padding-left: 10px;
            span {
                display: inline-block;
                margin-left: 5px;
            }
        }
        .banner {
            text-align: center;
            padding-left: 20px;
            padding: 80px;
            // margin-bottom: 8px;
            font-size: 20px;
            color: var(--primary-color);
        }
        .registerContent {
            flex-direction: column;
            color: var(--primary-color);
            width: 100%;
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
                margin-top: 150px;
                line-height: 50px;
                font-size: 30px;
                border-radius: 25px;
                text-align: center;
                color: white;
                background-color: var(--primary-color);
            }
        }
        .curtain {
            position: absolute;
            color: var(--primary-color);
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            z-index: 999;
            font-size: 30px;
            background-color: rgba(0, 0, 0, .5);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>