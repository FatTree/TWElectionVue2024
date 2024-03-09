import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ticketFormatter, sortTicketFun } from '~/formatters/DataFormatter';
import type { TicketModel } from '~/models/DataModel';
import { getTicketData } from '~/services/DataService';
import type { AreaSelectedViewModel, TicketViewModel } from '~/viewModels/DataViewModel';

const storeName = 'ticket';

export const useTicketStore = defineStore( storeName, () => {
    const ticketNationList = ref<TicketModel[]>([]);
    const ticketCityList = ref<TicketModel[]>([]);
    const ticketDistList = ref<TicketModel[]>([]);
    const ticketLiList = ref<TicketModel[]>([]);

    const ticketNationViewList = computed({
        get() { return ticketFormatter(ticketNationList.value) },
        set(v) { ticketNationList.value = v; }
    });

    const ticketCityViewList = computed({
        get() { return ticketFormatter(ticketCityList.value) },
        set(v) { ticketCityList.value = v; }
    });

    const ticketDistViewList = computed({
        get() { return ticketFormatter(ticketDistList.value) },
        set(v) { ticketDistList.value = v; }
    });

    const ticketLiViewList = computed({
        get() { return ticketFormatter(ticketLiList.value) },
        set(v) { ticketLiList.value = v; }
    });

    const getTicketList = async(id: string, type: string, code: string, model?: AreaSelectedViewModel, liCode?: string, liModel?: AreaSelectedViewModel) => {
        let _list = await getTicketData(id, type, code, model, liCode, liModel);
        switch (type) {
            case 'C':
                ticketCityList.value = _list;
                break;
            case 'D':
                ticketDistList.value = _list;
                break;
            case 'L':
                ticketLiList.value = _list;
                break;
            default:
                ticketNationList.value = _list;
                break;
        }
    }

    const sortedCityTicketList = computed( () => ticketCityViewList.value.sort(sortTicketFun));

    return {
        ticketNationViewList,
        ticketCityViewList,
        ticketDistViewList,
        ticketLiViewList,
        sortedCityTicketList,
        getTicketList,
    }
});