<script lang="ts" setup>
import { useElectionStore } from '~/stores/useElectionStore';


const store = useElectionStore();
const { electionList } = storeToRefs(store);
const { getElectionList } = store;
await getElectionList();

const clickLanSelect = () => {
    const lanOptions: HTMLDivElement = document.getElementsByClassName('options')[0];
    console.log('click');
    lanOptions.classList.toggle('none')
}

</script>
<template>
    <div class="layout">
        <div class="layout__nav" style="z-index: 10;">
            <h3 class="layout__nav__title">{{ $t('UI.name') }}</h3>
            <select class="layout__nav__select" v-model="$i18n.locale">
                <option value="en">🇺🇸</option>
                <option value="ch">🇹🇼</option>
            </select>
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
                            {{ $t('UI.session', { session: item.session }) }}
                    </NuxtLink>
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss">
@import url('@/assets/reset.css');
.layout {
    background-color: $bgc;
    &__nav {
        background-color: $indigo-normal;
        height: 72px;
        position: fixed;
        width: 100%;
        top:0;
        display: flex;
        justify-content: space-between;

        &__title {
            color: $white-normal;
            @include fontWeight-blod;
            font-size: 32px;
            line-height: 72px;
            margin-left: 35px;
            @include mobile {
                font-size: 26px;
                margin-left: 14px;
            }
        }

        &__select {
            color: $white-normal;
            margin-right: 35px;
            font-size: 1.5em;
            background-color: $indigo-normal;
            cursor: pointer;
            @include mobile {
                margin-right: 14px;
            }
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