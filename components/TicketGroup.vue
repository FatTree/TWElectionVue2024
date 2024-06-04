<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTicketStore } from '~/stores/useTicketStore';

const store = useTicketStore();
const areaStore = useAreaStore();

const {
    ticketCityViewList,
    ticketDistViewList,
    ticketLiViewList,
} = storeToRefs(store);

const {
    selectedCity,
    selectedDist,
    selectedLi,
} = storeToRefs(areaStore);

type Props = {
    id: string;
    type: string;
    code: string;
    liCode?: string;
};
const props = withDefaults(defineProps<Props>(), {
    id: '1f7d9f4f6bfe06fdaf4db7df2ed4d60c',
    type: 'N',
    code: '00_000_00_000_0000',
});

</script>
<template>
<Transition name="fade" mode="out-in">
    <div class="hints outBox" v-if="!selectedCity && !selectedDist && !selectedDist">
        <div class="hint">
            <div class="hint__top">
                <h3>{{ $t('hint.hint') }}</h3>
                <p>
                    {{ $t('hint.hint1') }}
                </p>
            </div>
            <div class="hint__btm">
                <img src="data:image/png;base64,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" alt="">
            </div>
        </div>
        <div class="hint">
            <div class="hint__top">
                <h3>{{ $t('hint.hint') }}</h3>
                <p>
                    {{ $t('hint.hint2') }}
                </p>
            </div>
            <div class="hint__btm">
                <div>
                    <img src="data:image/png;base64,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" alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="outBox" v-else>
        <Tickets :id="id" type="C" :code="code" :list="ticketCityViewList" :areaVM="selectedCity" v-if="selectedCity" />
        <Tickets :id="id" type="D" :code="selectedCity?.areaCode" :list="ticketDistViewList" :areaVM="selectedDist!" v-if="ticketDistViewList.length && selectedDist" />
        <Tickets :id="id" type="L" :code="selectedCity?.areaCode" :list="ticketLiViewList" :areaVM="selectedDist!" :liVM="selectedLi!" v-if="selectedLi" />
    </div>
</Transition>
</template>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: all .3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.outBox {
    display: grid;
    gap: 20px;
    min-width: 295px;

    @include pad {
        display: flex;
        justify-content: flex-start;
        overflow-x: auto;
    }
}

.hints {
    .hint {
        width: 240px;
        background-color: #DEE0E4;
        border-radius: 8px;
        padding: 20px;

        &__btm {
            display: flex;
            justify-content: center;
            margin-top: 4em;
        }
    }
}



</style>