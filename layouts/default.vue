<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useElectionStore } from '~/stores/useElectionStore'


// const store = useThemeStore();
const store = useElectionStore();
const { electionList } = storeToRefs(store);
const { getElectionList } = store;
await getElectionList();

</script>
<template>
    <div class="layout">
        <div class="layout__nav">
            <h3 class="layout__nav__title">2020 開票地圖</h3>
        </div>
        <div class="layout__content">
            <div class="tabContainer">
                <div class="tabContainer__wrapper">
                    <NuxtLink class="tabContainer__wrapper__item" 
                        v-for=" (item, index) in electionList" 
                        :key="index" 
                        :to="{
                            name: 'id-type-code',
                            params: { 
                                id: item.theme_id,
                                type: 'N',
                                code: `${item.prv_code}_${item.city_code}_${item.area_code}_${item.dept_code}_${item.li_code}` 
                            },}">
                            {{ item.theme_name }}
                    </NuxtLink>
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss">
@import url('@/assets/reset.css');
@import '../assets/_color.scss';
@import '../assets/_font.scss';

@mixin mobile {
    @media(max-width:768px){
        @content;
    }
}

.layout {
    background-color: $bgc;
    &__nav {
        background-color: $indigo-normal;
        height: 72px;
        position: fixed;
        width: 100%;
        top:0;

        &__title {
            color: $white-normal;
            @include fontWeight-blod;
            font-size: 32px;
            line-height: 72px;
            padding-left: 35px;
        }

        @include mobile {
            height: 72px;
        }
    }

    &__content {
        padding: 30px 35px;
        margin-top: 72px;
        height: calc(100vh - 72px);
        overflow-y: auto;

        @include mobile {

            padding: 30px 14px;
        }

        & .tabContainer {
            touch-action: pan-y;
            overflow: hidden;
            height: 50px;
            
            &__wrapper {
                display: flex;
                white-space: nowrap;
                overflow-x: auto;
                padding-bottom: 17px;

                >.router-link-active.router-link-exact-active {
                    color: $black-normal;
                    border-bottom: 4px solid $indigo-normal;
                    @include fontWeight-blod;
                }

                &__item {
                    @include h6;
                    display: block;
                    border-bottom: 4px solid $bgc;
                    text-decoration: none;
                    padding: .5em 0;
                    margin-right: 20px;
                    transition: all .3s ease-out;

                    &:link, &:visited {
                        color: $white-dark;
                        border-bottom: 4px solid $bgc;
                    }

                    &:hover {
                        color: $indigo-normal;
                        border-bottom: 4px solid $white-dark;
                        @include fontWeight-blod;
                    }

                    &:active {
                        color: $black-normal;
                        border-bottom: 4px solid $indigo-normal;
                        @include fontWeight-blod;
                    }
                }
            }
        }
    }
}
</style>