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

// const CCode = ref(''); // 64_000_00_000_0000
// const DCode = ref(''); // 64_000_00_070_0000

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
    OACCode,
    OADCode,
} = storeToRefs(overallStore);

const handleCCode = (CModel: AreaSelectedViewModel) => {
    selectedCity.value = CModel;
    // CCode.value = CModel.areaCode;
    OAAreaVM.value = CModel;
    OAType.value = 'C';
    OACCode.value = CModel.areaCode;
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
    OADCode.value = DModel.areaCode;
    OACode.value = OACCode.value; 
    selectedLi.value = null;
}

const handleLCode = (LModel: AreaSelectedViewModel) => {
    OAAreaVM.value = LModel;
    OAType.value = 'L';
    OACode.value = OACCode.value; 
    OALiCode.value = OADCode.value;
    selectedLi.value = LModel;
}

const clearSelectedArea = () => {
    selectedCity.value = undefined;
    selectedDist.value = undefined;
    selectedLi.value = undefined;
    OADCode.value = '';
    OACCode.value = '';
}

const clearArea = (selectedArea: Ref<AreaSelectedViewModel|undefined>, code: Ref<string>) => {
    selectedArea.value = undefined;
    code.value = '';
}

watch(OACCode, async(v) => {
    if(OACCode.value === '') return;
    await getAreaList(props.id, "D", OACCode.value);
});

watch(OADCode, async(v) => {
    if(OADCode.value === '') return;
    await getAreaList(props.id, "L", OACCode.value, OADCode.value);
});

onBeforeMount( async() => {
    await getAreaList(props.id, 'C', props.code);
    // await getAreaList(props.id, 'D', OACCode.value);
    // await getAreaList(props.id, 'L', OACCode.value, OADCode.value);
})


</script>
<template>
    <div class="area">
        <div class="area__block">
            <Area :id="id" class="option__block" type="C" :code="code" :optList="cityOption"  @emit-area-code="handleCCode" />
            <div class="option__block">
                <Area :id="id" class="option__block__element" type="D" :code="OACCode" :optList="districtOption" @emit-area-code="handleDCode" />
                <Area :id="id" class="option__block__element" type="L" :code="OACCode" :liCode="OADCode" :optList="liOption" @emit-area-code="handleLCode" />
            </div>
        </div>
        <button @click="clearSelectedArea">清除</button>
    </div>
</template>

<style lang="scss" scoped>
@mixin mobile {
    @media(max-width:768px){
        width: 100%;
        @content;
    }
}
.area {
    display: flex;

    &__block {
        display: flex;

        @include mobile {
            display: block;
        }
        .option__block {
            display: flex;
            width: 100%;

            &__element {
                width: 50%;
            }
        }
    }
}

</style>