import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AreaModel } from '~/models/DataModel';
import { getAreaData } from '~/services/DataService';
import { areaFormatter } from '~/formatters/DataFormatter';
import type { AreaSelectedViewModel } from '~/viewModels/DataViewModel';
import { AREA } from '~/assets/enum/enum';

const storeName = 'area';
export const useAreaStore = defineStore(storeName, () => {
    const cityList = ref<AreaModel[] | undefined>([]);
    const districtList = ref<AreaModel[] | undefined>([]);
    const liList = ref<AreaModel[] | undefined>([]);
    const selectedCity = ref<AreaSelectedViewModel | null>();
    const selectedDist = ref<AreaSelectedViewModel | null>();
    const selectedLi = ref<AreaSelectedViewModel | null>();

    const getAreaList = async(id: string, type: string, code: string, liCode?: string) => {
        switch (type) {
            case AREA.CITY:
                cityList.value = await getAreaData(id, AREA.CITY, code);
                break;
            case AREA.DISC:
                districtList.value = await getAreaData(id, AREA.DISC, code);
                break;
            case AREA.VLI:
                liList.value = await getAreaData(id, AREA.VLI, code, liCode);
            default:
                break;
        }
    }

    const cityOption = computed(() => {
        return cityList.value ? cityList.value.map( (e: AreaModel) => (areaFormatter(e)) ) : undefined;
    });

    const districtOption = computed({
        get () {
            return districtList.value ? districtList.value.map( (e: AreaModel) => (areaFormatter(e)) ) : undefined;
        },
        set (v) {
            districtList.value ? districtList.value = v : undefined;
        }
    });

    const liOption = computed({
        get () {
            return liList.value ? liList.value.map( (e: AreaModel) => (areaFormatter(e)) ) : undefined;
        },
        set (v) {
            liList.value ? liList.value = v : undefined;
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
    }
});