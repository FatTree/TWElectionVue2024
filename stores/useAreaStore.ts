import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AreaModel } from '~/models/DataModel';
import { getAreaData } from '~/services/DataService';
import { areaFormatter } from '~/formatters/DataFormatter';
import type { AreaSelectedViewModel } from '~/viewModels/DataViewModel';

const storeName = 'area';

export const useAreaStore = defineStore(storeName, () => {
    const cityList = ref<AreaModel[]>([]);
    const districtList = ref<AreaModel[]>([]);
    const liList = ref<AreaModel[]>([]);
    const selectedCity = ref<AreaSelectedViewModel | null>();
    const selectedDist = ref<AreaSelectedViewModel | null>();
    const selectedLi = ref<AreaSelectedViewModel | null>();

    const setSelectedArea = (type: string, v: AreaSelectedViewModel) => {
        switch (type) {
            case "C":
                selectedCity.value = v;
                break;
            case "D":
                selectedDist.value = v;
                break;
            case "L":
                selectedLi.value = v;
            default:
                break;
        }
    }

    const getAreaList = async(id: string, type: string, code: string, liCode?: string) => {
        switch (type) {
            case "C":
                cityList.value = await getAreaData(id, "C", code);
                break;
            case "D":
                districtList.value = await getAreaData(id, "D", code);
                break;
            case "L":
                liList.value = await getAreaData(id, "L", code, liCode);
            default:
                break;
        }
    }

    const cityOption = computed(() => {
        return cityList.value.map( (e: AreaModel) => (areaFormatter(e)) );
    });

    const districtOption = computed(() => {
        return districtList.value.map( (e: AreaModel) => (areaFormatter(e)) );
    });

    const liOption = computed({
        get () {
            return liList.value.map( (e: AreaModel) => (areaFormatter(e)) );
        },
        set (v) {
            liList.value = v;
        }
    });


    return {
        cityList,
        districtList,
        liList,
        cityOption,
        districtOption,
        liOption,
        selectedCity,
        selectedDist,
        selectedLi,
        getAreaList,
        setSelectedArea,
    }
});