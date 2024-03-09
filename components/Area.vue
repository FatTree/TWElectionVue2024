<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { defineEmits } from 'vue';
import type { AreaSelectedViewModel, AreaViewModel } from '~/viewModels/DataViewModel';

type Props = {
    id: string;
    type: string;
    code: string;
    optList: AreaViewModel[];
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
} = storeToRefs(areaStore);

const ticketStore = useTicketStore();
const {
    getTicketList,
} = ticketStore;

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
});

</script>
<template>
    <div class="area">
        <select v-model="selectedArea">
            <option v-if="type!=='C'" disabled selected>請選擇</option>
            <option v-for="(item, i) in optList" :key="i"
                :value="{
                    prv_code: item.prv_code,
                    city_code: item.city_code,
                    area_code: item.area_code,
                    dept_code: item.dept_code,
                    li_code: item.li_code,
                    areaCode: item.areaCode,
                    areaName: item.area_name
                }">
            {{ item.areaCode }}-{{ item.area_name }}</option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
.area {
    
}
</style>