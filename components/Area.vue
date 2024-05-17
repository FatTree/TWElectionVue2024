<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { defineEmits } from 'vue';
import { sortTicketFun } from '~/formatters/DataFormatter';
import type { AreaSelectedViewModel, AreaViewModel } from '~/viewModels/DataViewModel';

type Props = {
    id: string;
    type: string;
    optList: AreaViewModel[];
    selectedV?: string | undefined;
    code?: string;
    liCode?: string;
}

const props = withDefaults(defineProps<Props>(), {
    id: '',
    type: '',
    code: '',
    selectedV: '',
    optList: () => ([]),
    liCode: '',
});

const areaStore = useAreaStore();
const { 
    selectedLi,
    selectedCity,
} = storeToRefs(areaStore);

const ticketStore = useTicketStore();
const {
    getTicketList,
} = ticketStore;

const { 
    ticketNationViewList,
    ticketCityViewList,
    ticketDistViewList,
    ticketLiViewList,
} = storeToRefs(ticketStore);

const overallStore = useOverallStore();
const {
    OAType,
    OACode,
    OALiCode,
    OAList,
    OAAreaVM,
} = storeToRefs(overallStore);

const selectedArea: Ref<AreaSelectedViewModel | undefined> = ref();

const emit = defineEmits([
    'emitAreaCode'
]);

watch( selectedArea,  async(v) => {
    emit('emitAreaCode', selectedArea.value);
    if ( props.type === 'C' || props.type === 'D') {
        await getTicketList(props.id, props.type, props.code, selectedArea.value);
    } else if (props.type === 'L') {
        await getTicketList(props.id, props.type, props.code, selectedArea.value, props.liCode, selectedLi.value!);
    }
    
    switch (props.type) {
        case 'C':
            OAList.value = ticketCityViewList.value.sort(sortTicketFun);
            break;
        case 'D':
            OAList.value = ticketDistViewList.value.sort(sortTicketFun);
            break;
        case 'L':
            OAList.value = ticketLiViewList.value.sort(sortTicketFun);
            break;
        default:
            OAList.value = ticketNationViewList.value.sort(sortTicketFun);
            break;
    }
});

const clickSelect = (ev:Event) => {
    if (!props.optList.length) return;

    const _select = ev.currentTarget;
    const _options = _select.querySelector('div.select__options')
    
    _options.classList.toggle('none');
    _select.classList.toggle('select--selected');
}

const blurSelect = (ev: Event) => {
    // console.log('blur', ev);
    const _select = ev.currentTarget;
    const _options = _select.querySelector('div.select__options')
    if(!_options.classList.contains('none')) {
        _select.classList.toggle('select--selected');
        _options.classList.toggle('none');
    }
}

const clickOption = (v: AreaViewModel) => {
    selectedArea.value = {
        prv_code: v.prv_code,
        city_code: v.city_code,
        area_code: v.area_code,
        dept_code: v.dept_code,
        li_code: v.li_code,
        areaCode: v.areaCode,
        areaName: v.area_name};
}

</script>
<template>
    <div class="select" 
            tabindex="0"
            @click="clickSelect($event)"
            @blur="blurSelect($event)"
            :class="optList.length ? '' : 'disabled'">
        <div class="selected">{{ selectedV ? selectedV : '--' }}</div>
        <div class="select__options none">
            <div class="options__option" 
                v-for="item in optList" 
                @click="clickOption(item)"
                :value="item.area_name">
                    {{ item.area_name }}
            </div>
        </div>
        <select v-model="selectedArea">
            <option :value="undefined" disabled>Select car:</option>
            <option v-for="(item, i) in optList" :key="i"
                :value="{
                    prv_code: item.prv_code,
                    city_code: item.city_code,
                    area_code: item.area_code,
                    dept_code: item.dept_code,
                    li_code: item.li_code,
                    areaCode: item.areaCode,
                    areaName: item.area_name}">
                    {{ item.area_name }}
            </option>
        </select>
    </div>
</template>


<style lang="scss" scoped>
@import '../assets/_color';
@import '../assets/_font';
@import '../assets/_share';

@mixin pad {
    @media(max-width: 1100px) {
        @content;
    }
}
@mixin mobile {
    @media(max-width:768px){
        @content;
    }
}

.select {
    border: 1px solid $white-normal-hover;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    height: 35px;
    min-width: 9em;
    position: relative;
    /* margin-right: .6em; */

    &:not(:last-child) {
        margin-right: 1em;
    }
    
    @include pad {
        &:first-child {
            margin-right: 0;
        }
    }

    &--selected {
        border: 1px solid $indigo-normal;
    }

    &::after {
        position: absolute;
        content: '';
        width: 24px;
        height: 24px;
        background-image: url(/_nuxt/assets/png/right-arrow.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 16px;
        rotate: 90deg;
        right: 0.4em;
        top: 0.4em;
    }

    &.disabled {
        background-color: $white-normal-hover;
        cursor: not-allowed;

        > .selected {
            color: $white-dark;
        }

        &::after {
            opacity: 10%;
        }
    }

    > select {
        display: none;
    }

    > .selected {
        position: absolute;
        top: 0;
        left: 0;
        @include select-T;
        padding: .2em .5em;
    }

    > .select__options.none {
        display: none;
    }
    > .select__options {
        border: 1px solid $indigo-normal;
        background-color: #fff;
        border-radius: 8px;
        position: absolute;
        top: 40px;
        width: 100%;
        overflow-y: scroll;
        z-index: 10;
        /* height: 65vh; */

        .options__option {
            @include select-T;
            padding: .3em;

            &:hover {
                background-color: $white-normal-hover;
            }
        }
    }
}

</style>