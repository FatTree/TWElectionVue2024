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
    const isOverallLoading = ref(false);

    const setDefaultOverall = async (
        id: string, 
        type: string, 
        code: string, 
        CCode: string,
        list: TicketViewModel[], 
        DList: TicketViewModel[], 
        selectedCityVal?: AreaSelectedViewModel | null, 
    ) => {
        isOverallLoading.value = true;
        liOption.value = undefined;
        selectedCity.value = selectedCityVal;
        selectedDist.value = null;
        selectedLi.value = null;
        OACCode.value = CCode;
        OADCode.value = '';
        OAType.value = type;
        OACode.value = code;
        OAList.value = list;
        ticketDistViewList.value = DList;
        ticketLiViewList.value = [];
        await getProfileList(id, type, code);
        isOverallLoading.value = false;
    }
    
    return {
        OAType,
        OACode,
        OAList,
        OAAreaVM,
        OACCode,
        OADCode,
        OALiCode,
        isOverallLoading,
        setDefaultOverall,
    }
});