<script lang="ts" setup>
import type { AreaSelectedViewModel, AreaViewModel } from "~/viewModels/DataViewModel";
import { useOverallStore } from '~/stores/useOverallStore';

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
    setDefaultOverall,
} = overallStore;

const {
    OAAreaVM,
    OAType,
    OACode,
    OAList,
    OALiCode,
    OACCode,
    OADCode,
} = storeToRefs(overallStore);


const handleCCode = (CModel: AreaSelectedViewModel) => {
    selectedCity.value = CModel;
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

const clearSelectedArea = async () => {
    OAType.value = 'N';
    districtOption.value = undefined;
    await setDefaultOverall(props.id, OAType.value, props.code, OACCode.value, OAList.value, []);
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
});

</script>
<template>
    <div class="area">
        <div class="area__block">
            <Area :id="id" class="option__block" type="C" :code="code" :optList="cityOption" :selectedV="selectedCity?.areaName" @emit-area-code="handleCCode" />
            <div class="option__block2">
                <Area :id="id" class="option__block__element" type="D" :code="OACCode" :optList="districtOption" :selectedV="selectedDist?.areaName" @emit-area-code="handleDCode" />
                <Area :id="id" class="option__block__element" type="L" :code="OACCode" :liCode="OADCode" :optList="liOption" :selectedV="selectedLi?.areaName"  @emit-area-code="handleLCode" />
            </div>
        </div>
        <button @click="clearSelectedArea" class="area__clear">
            <label>清除</label>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rotate-right" class="svg-inline--fa fa-rotate-right " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"></path></svg>
        </button>
    </div>
</template>

<style lang="scss" scoped>
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

.area {
    display: flex;
    gap: 1em;

    &__block {
        display: flex;

        @include mobile {
            display: block;
            width: 100%;
        }
        .option__block2 {
            display: flex;
            justify-content: space-between;

            @include mobile {
                margin-top: .5em;

                &:first-child {
                    margin-bottom: 8px;
                }
            }

            > .select {
                width: 49%;
            }
        }
    }

    &__clear {
        padding: 4px 12px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        cursor: pointer;

        > label {
            line-height: 1.6em;
            @include mobile {
                display: none;
            }
        }
        > svg {
            width: 18px;
            margin-left: .5em;
            @include mobile {
                margin: 0;
            }
        }
    }
}
</style>