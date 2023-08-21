<template>
    <div class="myInfo">
        <div class="back" @click="back"><span>&lt;</span><span>返回</span></div>
        <div class="nav">更新前的昵称: <span>{{ nick_name }}</span></div>
        <div class="nav">更新后的昵称: <input type="text" v-model="updateNickName"></div>
        <div class="nav updateBtn" @click="ackChangeInfo">更新</div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { changeUserInfo } from "../../../service/modules/mine"

let isChange = ref(false)
let oldName = ref()
let updateNickName = ref()
//这样的值传递过来拿到之后只能渲染到页面上使用，不能在JS中使用
let name = defineProps({
    nick_name: {
        type: String,
        default: ""
    },
    user_id: {
        type: Number,
        default: ""
    }
})

const emit = defineEmits([])

const back = () => {
    emit("isChange", isChange.value)
}
const ackBack = (value) => {
    emit("oldName", value)
    emit("isChange", isChange.value)
}

const ackChangeInfo = () => {
    console.log(name.user_id)
    changeUserInfo(updateNickName.value, name.user_id).then(res => {
        oldName.value = res.data
        ackBack(oldName.value)
    })
    console.log(name.user_id)
}


</script>

<style lang="less" scoped>
.myInfo {
    // padding-left: 30px;
    // padding-top: 50px;
    font-size: 18px;
    background-color: white;
    .back {
        font-size: 15px;
        height: 30px;
        width: 100%;
        padding: 10px 0 0 10px;
        margin-bottom: 150px;
        border-bottom: 1px solid lightgray;
        color: var(--primary-color);
        span {
            display: inline-block;
            margin-left: 5px;
        }
    }
    input {
        color: black;
    }
    .nav {
        padding-left: 10px;
        margin-bottom: 20px;
        span {
            color: black;
        }
    }
    .updateBtn {
        width: 150px;
        height: 40px;
        margin: auto;
        margin-left: 100px;
        margin-top: 200px;
        line-height: 40px;
        font-size: 25px;
        border-radius: 25px;
        text-align: center;
        color: white;
        background-color: var(--primary-color);
    }
}
</style>