<template>
    <div class="section">
        <div class="header">
            <h2 class="title">{{ title }}</h2>
        </div>
        <div class="content">
            <slot>
                <h3></h3>
            </slot>
        </div>
        <div class="footer" v-if="moreText.length">
            <span class="more">{{ moreText  }}</span>
            <van-icon name="arrow" class="icon"/>
        </div>
    </div>
</template>

<script setup>

defineProps({
    title: {
        type: String,
        default: "默认标题"
    },
    moreText: {
        type: String,
        default: ""
    }
})
</script>

<style lang="less" scoped>
.section {
    display: flex;
    flex-direction: column;
    border-top: 5px solid #f3f4f5;
    padding: 10px;
    .header {
        padding-bottom: 10px;
        border-bottom: solid 1px lightgray;
    }
    .content {
        padding: 10px;
    }
    .footer {
        position: relative;
        padding-bottom: 15px;
        color: var(--primary-color);
        .more {
            position: absolute;
            right: 20px;
        }
        .icon {
            position: absolute;
            right: 5px;
        }
    }

}
</style>