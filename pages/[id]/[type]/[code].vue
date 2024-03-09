<script lang="ts" setup>
import { onUpdated } from 'vue';
import { useRoute } from '#vue-router';
import { storeToRefs } from 'pinia';
import { useTicketStore } from '~/stores/useTicketStore';
import type { AreaSelectedViewModel }  from '~/viewModels/DataViewModel';

const route = useRoute();
const id = route.params.id as string;
const type = route.params.type as string;
const code = route.params.code as string;

const ticketStore = useTicketStore();
const areaStore = useAreaStore();
const overallStore = useOverallStore();

const { 
    ticketNationViewList,
    ticketCityViewList,
    ticketDistViewList,
    ticketLiViewList,
} = storeToRefs(ticketStore);
const {
    getTicketList
} = ticketStore;

const {
    selectedCity,
    selectedDist,
    selectedLi,
} = storeToRefs(areaStore);

const {
    OAType,
    OACode,
    OALiCode,
    OAList,
    OAAreaVM,
} = storeToRefs(overallStore);


watch(OAAreaVM, async () => {
    const _type = OAType.value;
    if (_type === 'L') {
        await getTicketList(id, OAType.value, OACode.value, OAAreaVM.value, OALiCode.value, OAAreaVM.value);
    } else {
        await getTicketList(id, OAType.value, OACode.value, OAAreaVM.value);
    }
    
    switch (_type) {
        case 'C':
            OAList.value = ticketCityViewList.value;
            break;
        case 'D':
            OAList.value = ticketDistViewList.value;
            break;
        case 'L':
            OAList.value = ticketLiViewList.value;
            break;
        default:
            OAList.value = ticketNationViewList.value;
            break;
    }
});

if (type === 'N') {
    await getTicketList(id, type, code);
    OAType.value = type;
    OACode.value = code;
    OAList.value = ticketNationViewList.value;
}
</script>
<template>
    <div class="options">
        <AreaDropdownGroup :id="id" :type="type" :code="code" />
    </div>
    <div class="content">
        <div class="overall">
            <h1>投票概況</h1>
            <div v-if="OAType === 'N'">
                <label>全國</label>
            </div>
            <div v-else>
                <label v-if="selectedCity">{{ selectedCity.areaName }}</label><label v-if="selectedDist"> - {{ selectedDist.areaName}} </label> <label v-if="selectedLi"> - {{ selectedLi.areaName }}</label>
            </div>
            <Profile :id="id" :type="OAType" :code="OACode" />
            <Tickets :id="id" :type="OAType" :code="OACode" :list="OAList" />
        </div>
        <div class="map">
            <Map :id="id" type="C" />
        </div>
        <div class="detail">
            <h2>Tickets</h2>
            <TicketGroup :id="id" :type="type" :code="code" />
        </div>
    </div>
</template>

<style lang="scss">
.options {
    display: flex;
    gap: 20px;
    margin-top: 20px;
}

.content {
    display: flex;

    > .overall {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
    }
}
</style>