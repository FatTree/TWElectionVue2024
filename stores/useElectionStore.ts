import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ElectionModel } from '~/models/DataModel';
import { getElectionData } from '~/services/DataService';

const storeName = 'election';

export const useElectionStore = defineStore( storeName, () => {
    const electionList = ref<ElectionModel[]>([]);

    /**
     * @returns 
     * { [ theme_id, theme_name,], []... }
     */
    const getElectionList = async () => {
        const data = await getElectionData(); 
        if (data) {
            electionList.value = data;
        }
    };
    
    return {
        getElectionList,
        electionList,
    }
});