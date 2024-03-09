<script lang="ts" setup>
import type { AreaSelectedViewModel, AreaViewModel } from "~/viewModels/DataViewModel";

type Props = {
    id: string;
    type: string;
    code: string;
}

const props = withDefaults(defineProps<Props>(), {
    id: '',
    type: '',
    code: '',
});

const CCode = ref('64_000_00_000_0000');
const DCode = ref('64_000_00_070_0000');

const areaStore = useAreaStore();
const ticketStore = useTicketStore();
const overallStore = useOverallStore();
const {
    cityOption,
    districtOption,
    liOption,
    selectedCity,
    selectedDist,
    selectedLi,
    cityList,
    districtList,
    liList,
} = storeToRefs(areaStore);

const { 
    getAreaList,
} = areaStore;

const {
    ticketDistViewList,
    ticketLiViewList,
} = storeToRefs(ticketStore);

const {
    OAAreaVM,
    OAType,
    OACode,
    OALiCode,
} = storeToRefs(overallStore);

const handleCCode = (CModel: AreaSelectedViewModel) => {
    selectedCity.value = CModel;
    CCode.value = CModel.areaCode;
    OAAreaVM.value = CModel;
    OAType.value = 'C';
    OACode.value = props.code; 
    liOption.value = [];
    ticketDistViewList.value = [];
    ticketLiViewList.value = [];
    selectedDist.value = null;
    selectedLi.value = null;
}

const handleDCode = (DModel: AreaSelectedViewModel) => {
    selectedDist.value = DModel;
    OAAreaVM.value = DModel;
    OAType.value = 'D';
    OACode.value = CCode.value; 
    DCode.value = DModel.areaCode;
    selectedLi.value = null;
}

const handleLCode = (LModel: AreaSelectedViewModel) => {
    OAAreaVM.value = LModel;
    OAType.value = 'L';
    OACode.value = CCode.value; 
    OALiCode.value = DCode.value;
    selectedLi.value = LModel;
}

const clearSelectedArea = () => {
    selectedCity.value = null;
    selectedDist.value = null;
    selectedLi.value = null;
    // ticketDistViewList.value = [];
    // ticketLiViewList.value = [];
    // cityList.value = []
    // selectedCity.value = null;
    // districtList.value = [];
    // liList.value = [];
}

watch(CCode, async(v) => {
    await getAreaList(props.id, "D", CCode.value);
});

watch(DCode, async(v) => {
    await getAreaList(props.id, "L", CCode.value, DCode.value);
});

onBeforeMount( async() => {
    await getAreaList(props.id, 'C', props.code);
    await getAreaList(props.id, 'D', CCode.value);
    await getAreaList(props.id, 'L', CCode.value, DCode.value);
})
</script>
<template>
    <Area :id="id" type="C" :code="code" :optList="cityOption" @emit-area-code="handleCCode" />
    <Area :id="id" type="D" :code="CCode" :optList="districtOption" @emit-area-code="handleDCode" v-if="CCode"  />
    <Area :id="id" type="L" :code="CCode" :liCode="DCode" :optList="liOption" @emit-area-code="handleLCode" v-if="DCode" />
    <button @click="clearSelectedArea">清除</button>
</template>

<style lang="scss" scoped>

</style>