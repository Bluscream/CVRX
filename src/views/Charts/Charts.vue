<template>
    <div id="chart" class="x-container" v-show="menuActiveIndex === 'charts'">
        <div class="options-container" style="margin-top: 0">
            <span class="header">{{ t('view.charts.header') }}</span>
        </div>
        <keep-alive>
            <InstanceActivity v-if="menuActiveIndex === 'charts'" />
            <el-backtop target="#chart" :right="30" :bottom="30"></el-backtop>
        </keep-alive>
    </div>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import { useI18n } from 'vue-i18n-bridge';
    import InstanceActivity from './components/InstanceActivity.vue';
    import { useUiStore } from '../../stores';

    const { t } = useI18n();

    const uiStore = useUiStore();
    const { menuActiveIndex } = storeToRefs(uiStore);
</script>
