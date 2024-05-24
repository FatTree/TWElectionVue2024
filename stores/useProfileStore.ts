import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { profileFormatter } from '~/formatters/DataFormatter';
import type { ProfileModel } from '~/models/DataModel';
import type { AreaSelectedViewModel, ProfileViewModel } from '~/viewModels/DataViewModel';
import { getProfileData } from '~/services/DataService';

const storeName = 'profile';

export const useProfileStore = defineStore( storeName, () => {
    const profile = ref<ProfileModel | ProfileModel[] | null>();
    const profileView = ref<ProfileViewModel | null>();
    const vote_ticket = ref<number>(0);
    const invalid_ticket = ref<number>(0);
    const valid_ticket = ref<number>(0);
    const vote_to_elect = ref<number>(0);

    const getProfileList = async(id: string, type: string, code: string, VModel?: AreaSelectedViewModel,liCode?: string) => {
        let _list: ProfileModel | null;
        if (type.trim() === 'L') {
            _list = await getProfileData(id, type, code, VModel, liCode);
        } else {
            _list = await getProfileData(id, type, code, VModel);
        }
        profile.value = _list;
        
        if (profile.value !== null) {
            vote_ticket.value = profile.value.vote_ticket;
            invalid_ticket.value = profile.value.invalid_ticket;
            valid_ticket.value = profile.value.valid_ticket;
            vote_to_elect.value = profile.value.vote_to_elect;
            profileView.value = profileFormatter(profile.value);
        }

    }

    const formatted_invalid_ticket = computed( () => {
        return profileView.value!.formatted_invalid_ticket;
    });

    const formatted_valid_ticket = computed( () => {
        return profileView.value!.formatted_valid_ticket;
    });

    const formatted_vote_ticket = computed( () => {
        return profileView.value!.formatted_vote_ticket;
    });

    const formatted_vote_to_elect = computed( () => {
        return profileView.value!.formatted_vote_to_elect;
    });

    return {
        profileView,
        formatted_invalid_ticket,
        formatted_valid_ticket,
        formatted_vote_ticket,
        formatted_vote_to_elect,
        getProfileList,
    }
});