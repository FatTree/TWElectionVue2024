import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AreaSelectedViewModel, TicketViewModel } from '~/viewModels/DataViewModel';

const storeName = 'overall';

export const useOverallStore = defineStore( storeName, () => {
    const OAType = ref('');
    const OACode = ref('');
    const OALiCode = ref('');
    const OAList= ref<TicketViewModel[]>([]);
    const OAAreaVM = ref<AreaSelectedViewModel>();
    const OACCode = ref('');
    const OADCode = ref('');
    
    return {
        OAType,
        OACode,
        OAList,
        OAAreaVM,
        OACCode,
        OADCode,
        OALiCode,
    }
});