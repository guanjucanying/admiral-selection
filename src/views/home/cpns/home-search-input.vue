<template>
    <div class="search">
        <van-search 
        v-model="searchValue" 
        placeholder="城市/区域/位置" 
        shape="round"
        show-action
        @cancel="cancelClick"
        />
        <van-tabs></van-tabs>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>

</style>