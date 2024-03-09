<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { sortTicketFun } from '~/formatters/DataFormatter';
import { useTicketStore } from '~/stores/useTicketStore';
import type { AreaSelectedViewModel, AreaViewModel, TicketViewModel } from '~/viewModels/DataViewModel';

type Props = {
    id: string;
    type: string;
    code: string;
    list: TicketViewModel[];
    areaVM?: AreaSelectedViewModel;
    liVM?: AreaSelectedViewModel;
};

const props = withDefaults(defineProps<Props>(), {
    id: '1f7d9f4f6bfe06fdaf4db7df2ed4d60c',
    type: 'N',
    code: '00_000_00_000_0000',
    list: ()=>([]),
});

const viewModel: Ref<AreaSelectedViewModel | undefined> = ref();

if (props.liVM) {
    viewModel.value = props.liVM;
} else if (props.areaVM) {
    viewModel.value = props.areaVM;
}

const sortedTicketList = computed( () => props.list.sort(sortTicketFun));

</script>
<template>
    <div class="ticketBox">
        <h3 v-if="liVM">{{ liVM?.areaCode }} - {{ liVM?.areaName }}</h3>
        <h3 v-else-if="areaVM">{{ areaVM.areaCode }} - {{ areaVM.areaName }}</h3>
        <div class="ticket" v-for="(item, i) in sortedTicketList" :key="i">
            <div class="ticket__number">
                <p>{{ item.cand_no }}</p>
            </div>
            <div class="ticket__name">
                <p class="ticket__name__party">{{ item.party_name }}</p>
                <p class="ticket__name__cand">{{ item.cand_name }} | {{ item.vice }}</p>
            </div>
            <div class="ticket__result">
                <p class="ticket__result__ticket">{{ item.formatted_ticket_num }}</p>
                <p class="ticket__result__percent">{{ item.formatted_ticket_percent }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../assets/_color';
@import '../assets/_font';

.ticketBox {

    .ticket {
        display: flex;
        /* > div:not(:last-child) {
            margin-right: 1em;
            margin-bottom: 1em;
        } */
    
        &__number {
            display: flex;
            align-items: center;
            margin: 0 1em 1em 0;
            /* justify-content: center; */
            > p {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 1px solid #000;
                text-align: center;
            }
        }
    
        &__name {
            margin: 0.5em 0.5em 1em 0;
            padding-right: 1em;
            border-right: 3px solid #000;
            &__party{
                @include T-RG;
                @include fontWeight-blod;
            }
    
            &__cand {
                @include T-XS;
                @include fontWeight-regular;
            }
        }
    
        &__result {
            margin: 0 0 1em .5em;
        }
    }
}

</style>