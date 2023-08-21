<template>
    <div class="address">
        <div class="back" @click="back"><span>&lt;</span><span>返回</span></div>
        <div class="listItem">
            <div v-for="item in addressList" :key="item.id" @click="addressClick(item)">
                <div class="nav">
                    <div class="addressInfo">
                        <div class="top">
                            <span class="name">{{ item.name }}</span>
                            <span class="phone">{{ item.phone }}</span>
                        </div>
                        <div class="bottom">
                            {{ item.address }}
                        </div>
                    </div>
                    <div class="change" @click="changeAddress">
                        <van-icon name="edit" />
                    </div>
                </div>
            </div>
        </div>
        <div class="addAddress" @click="addMask">添加收货地址</div>
        <div class="changeMask" v-show="isChange">
            <div class="back" @click="changeBack">
                <span>&lt;</span>
                <span>返回</span>
                <span class="delete" @click="deleteAddress">删除</span>
            </div>
            <div class="nav name">收货人: &nbsp;&nbsp;&nbsp;&nbsp; <input type="text" v-model="name"></div>
            <div class="nav">手机号码:&nbsp; <input type="text" v-model="phone"></div>
            <div class="nav">收获地址:&nbsp; <input type="text" v-model="address"></div>
            <div class="save" @click="saveAddress">
                保存地址
            </div>
        </div>
        <div class="addMask" v-show="isAdd">
            <div class="back" @click="addBack">                
                <span>&lt;</span>
                <span>返回</span>
            </div>
            <div class="nav name">收货人: &nbsp;&nbsp;&nbsp;&nbsp; <input type="text" v-model="addName"></div>
            <div class="nav">手机号码:&nbsp; <input type="text" v-model="addPhone"></div>
            <div class="nav">收获地址:&nbsp; <input type="text" v-model="addAddress"></div>
            <div class="save" @click="ackAddAddress">
                新建地址
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getAddressList, saveChangeAddress, delAddress, createAddress } from '../../../service/modules/mine';

let id = ref()
let name = ref()
let addName = ref()
let phone = ref()
let addPhone = ref()
let address = ref()
let addAddress = ref()
let isChange = ref(false)
let isAdd = ref(false)
let isAddress = ref(false)
let addressList =  reactive({})
let emit = defineEmits([])

const getAddress = () => {
    getAddressList().then(res => {
        addressList = res.data
    })
}

const back = () => {
    emit("isAddress", isAddress.value)
}   

const changeBack = () => {
    isChange.value = false
}

const addBack = () => {
    isAdd.value = false
}

const addressClick = (item) => {
    name.value = item.name
    phone.value = item.phone
    address.value = item.address
    id.value = item.id
}
const changeAddress = () => {
    isChange.value = true
}

const addMask = () => {
    isAdd.value = true
}

const ackAddAddress = () => {
    createAddress(addName.value, addPhone.value, addAddress.value).then(res => {
        console.log(res)
    });
    let newAddress = {
        "name":addName.value,
        "phone": addPhone.value,
        "address": addAddress.value
    }
    addressList.unshift(newAddress)
    isAdd.value = false
}

const saveAddress = () => {
    saveChangeAddress(id.value, name.value, phone.value, address.value).then(res => {
    })
    isChange.value = false
}

const deleteAddress = () => {
    delAddress(id.value).then(res => {
        isChange.value = false
    });
    addressList = addressList.reduce((result, item) => {
        if(item.id !== id.value) result.push(item)
        return result;
    }, [])
    // addressList = addressList.map((item) => {
    //     if(item.id != id.value) {
    //         return item;
    //     }
    // }).filter(Boolean);
    // addressList.every((item) => {
    //     if(item.id != item.value) {
    //         addressList.push(item);
    //         return true;
    //     }
    // })
}

defineProps({
    addresItem: {
        type: Object,
        default: () => ({})
    }
})

onMounted(() => {
    getAddress()
})

</script>

<style lang="less" scoped>
.address {
    height: 100vh;
    position: relative;
    .back {
        font-size: 15px;
        height: 30px;
        width: 100%;
        padding: 10px 0 0 10px;
        border-bottom: 1px solid lightgray;
        color: var(--primary-color);
        span {
            display: inline-block;
            margin-left: 5px;
        }
    }
    .listItem {
        margin-top: 30px;
        // position: absolute;
        .nav {
            display: flex;
            justify-content: space-between;
            color: black;
            padding: 10px;
            .addressInfo {
                .top {
                    .name {
                        font-size: 20px;
                        margin-right: 8px;
                    }
                    .phone {
                        font-size: 15px;
                    }
                }
                .bottom {
                    margin-top: 5px;
                    font-size: 13px;
                    color: gray;
                }
            }
            .change {
                margin-top: 10px;
                padding-right: 10px;
                color: var(--primary-color);
            }
        }
    }
    .addAddress {
        width: 200px;
        height: 50px;
        position: absolute;
        bottom: 50px;
        margin-left: 85px;
        line-height: 50px;
        font-size: 20px;
        border-radius: 25px;
        text-align: center;
        color: white;
        background-color: var(--primary-color);
    }
    .changeMask {
        z-index: 999;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        background-color: white;
        .delete {
            width: 100px;
            height: 30px;
            margin-left: 230px;
            // margin: auto;
            // margin-right: -20px;
            line-height: 30px;
            border-radius: 15px;
            font-size: 15px;
            text-align: center;
            color: white;
            background-color: var(--primary-color);
        }
        .nav {
            margin-left: 5px;
            margin-top: 20px;
            font-size: 20px;
            input {
                color: black;
            }
        }
        .name {
            margin-top: 100px;
        }
        .save {
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
    .addMask {
        z-index: 999;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        background-color: white;
        .delete {
            width: 100px;
            height: 30px;
            margin: auto;
            margin-right: -20px;
            line-height: 30px;
            border-radius: 15px;
            font-size: 15px;
            text-align: center;
            color: white;
            background-color: var(--primary-color);
        }
        .nav {
            margin-left: 5px;
            margin-top: 20px;
            font-size: 20px;
            input {
                color: black;
            }
        }
        .name {
            margin-top: 100px;
        }
        .save {
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
}
</style>