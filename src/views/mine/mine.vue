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
            <div class="nav" @click="changeInfoShow"><span class="manage">个人信息管理</span><span class="symbol">></span></div>
            <div class="nav" @click="changeAddressShow"><span class="manage">收货地址管理</span><span class="symbol">></span></div>
        </div>
        <div class="footer" @click="exit">
            <span>退出登录</span>
        </div>
        <manage-info class="info" v-show="isInfo" :nick_name="nick_name" :user_id="user_id"  @isChange="changeInfoState" @oldName="changeNickName"></manage-info>
        <manage-address class="address" v-show="isAddress" @isAddress="changeAddressState"></manage-address>
    </div>
</template>

<script>
</script>
<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getUserInfo} from '../../service/modules/mine';
import ManageAddress from './cpns/mine-02-address.vue'
import ManageInfo from './cpns/mine_01-info.vue'
// import ManageInfo from './cpns/mine_01-inf.vue'

const router = useRouter()

let isInfo = ref(false)
let isAddress = ref(false)
let user_name = ref()
let nick_name = ref()
let user_id = ref()

const getInfo = () => {
    getUserInfo().then(res => {
        user_name.value = res.data.user_name
        nick_name.value = res.data.nickname
        user_id.value = res.data.id
    })
}

const changeInfoShow = () => {
    isInfo.value = true
}

const changeInfoState = (value) => {
    isInfo.value = value
}

const changeNickName = (value) => {
    nick_name.value = value
}

const changeAddressShow = () => {
    isAddress.value = true
}

const changeAddressState = (value) => {
    isAddress.value = value
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
    height: 100vh;
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
            border-top: 1px solid lightpink;
            border-bottom: 1px solid lightpink;
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
        margin-top: 150px;
        line-height: 50px;
        font-size: 20px;
        border-radius: 25px;
        text-align: center;
        color: white;
        background-color: var(--primary-color);
    }
    // .info  {
    //     // overflow: hidden;
    //     position: absolute;
    //     z-index: 999;
    //     height: 100%;
    //     width: 100%;
    //     padding-left: 30px;
    //     padding-top: 50px;
    //     font-size: 18px;
    //     background-color: white;
    //     // align-items: center;
    //     input {
    //         color: black;
    //     }
    //     span {
    //         color: black;
    //     }
    //     .nav {
    //         margin-bottom: 20px;
    //     }
    //     .updateBtn {
    //         width: 150px;
    //         height: 40px;
    //         margin: auto;
    //         margin-left: 100px;
    //         margin-top: 50px;
    //         line-height: 40px;
    //         font-size: 25px;
    //         border-radius: 25px;
    //         text-align: center;
    //         color: white;
    //         background-color: var(--primary-color);
    //     }
    // }
    .info{
        z-index: 999;
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: 100%;
    }
    .address {
        z-index: 999;
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: white;
    }
}
</style>