import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AreaSelectedViewModel, TicketViewModel } from '~/viewModels/DataViewModel';

import { useProfileStore } from '~/stores/useProfileStore'
import { useAreaStore } from './useAreaStore';
import { useTicketStore } from './useTicketStore';

const storeName = 'overall';

export const useOverallStore = defineStore( storeName, () => {
    const profileStore = useProfileStore();
    const areaStore = useAreaStore();
    const ticketStore = useTicketStore();
    const {
        getProfileList,
    } = profileStore;

    const {
        cityOption,
        districtOption,
        liOption,
        selectedCity,
        selectedDist,
        selectedLi,
    } = storeToRefs(areaStore);

    const { 
        ticketDistViewList,
        ticketLiViewList,
    } = storeToRefs(ticketStore);

    const OAType = ref('');
    const OACode = ref('');
    const OALiCode = ref('');
    const OAList= ref<TicketViewModel[]>([]);
    const OAAreaVM = ref<AreaSelectedViewModel>();
    const OACCode = ref('');
    const OADCode = ref('');

    const setDefaultOverall = async (id: string, type: string, code: string, list: TicketViewModel[], DList: TicketViewModel[], selectedCityVal?: AreaSelectedViewModel | null) => {
        // districtOption.value = undefined;
        liOption.value = undefined;
        selectedCity.value = selectedCityVal;
        selectedDist.value = null;
        selectedLi.value = null;
        OADCode.value = '';
        OACCode.value = '';
        OAType.value = type;
        OACode.value = code;
        OAList.value = list;
        ticketDistViewList.value = DList;
        ticketLiViewList.value = [];
        await getProfileList(id, type, code);

        // selectedCity.value = CModel;
        // OAAreaVM.value = CModel;============
        // OAType.value = 'C';
        // OACCode.value = CModel.areaCode;
        // OACode.value = props.code; 
        // liOption.value = [];
        // ticketDistViewList.value = [];
        // ticketLiViewList.value = [];
        // selectedDist.value = null;
        // selectedLi.value = null;
    }
    
    return {
        OAType,
        OACode,
        OAList,
        OAAreaVM,
        OACCode,
        OADCode,
        OALiCode,
        setDefaultOverall,
    }
});