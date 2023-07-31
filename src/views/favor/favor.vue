<template>
    <div class="favor">
        <template v-for="(item) in 100" :key="index">
            <div>列表数据：{{ item }}</div>
        </template>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.favor {
    height: 300px;
    background: orange;
    overflow-y: auto;
}
</style>