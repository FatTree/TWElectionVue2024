<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { defineEmits } from 'vue';
import { sortTicketFun } from '~/formatters/DataFormatter';
import type { AreaSelectedViewModel, AreaViewModel } from '~/viewModels/DataViewModel';

type Props = {
    id: string;
    type: string;
    optList: AreaViewModel[];
    code?: string;
    liCode?: string;
}

const props = withDefaults(defineProps<Props>(), {
    id: '',
    type: '',
    code: '',
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
    }
    if (props.type === 'L') {
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
    console.log('Area(after): OAList', OAList.value);
});

</script>
<template>
    <div>
        <select v-model="selectedArea">
            <option selected :value="undefined" disabled>請選擇</option>
            <option v-for="(item, i) in optList" :key="i"
                :value="{
                    prv_code: item.prv_code,
                    city_code: item.city_code,
                    area_code: item.area_code,
                    dept_code: item.dept_code,
                    li_code: item.li_code,
                    areaCode: item.areaCode,
                    areaName: item.area_name
                }">{{ item.area_name }}</option>
            <!-- {{ item.areaCode }}-{{ item.area_name }} -->
        </select>
    </div>
    
    <!-- <button @click="selectedArea=undefined;">X</button> -->
</template>