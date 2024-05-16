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
    <div class="hints outBox" v-if="!selectedCity && !selectedDist && !selectedDist">
        <div class="hint">
            <div class="hint__top">
                <h3>小提示</h3>
                <p>
                    點擊縣市、區、里可查看選舉結果
                </p>
            </div>
            <div class="hint__btm">
                <div>請選擇</div>
            </div>
        </div>
        <div class="hint">
            <div class="hint__top">
                <h3>小提示</h3>
                <p>
                    點擊地圖可查看縣市的選舉結果
                </p>
            </div>
            <div class="hint__btm">
                <div>請選擇</div>
            </div>
        </div>
    </div>
    <div class="outBox" v-else>
        <Tickets :id="id" type="C" :code="code" :list="ticketCityViewList" :areaVM="selectedCity" v-if="selectedCity" />
        <Tickets :id="id" type="D" :code="selectedCity?.areaCode" :list="ticketDistViewList" :areaVM="selectedDist!" v-if="ticketDistViewList.length && selectedDist" />
        <Tickets :id="id" type="L" :code="selectedCity?.areaCode" :list="ticketLiViewList" :areaVM="selectedDist!" :liVM="selectedLi!" v-if="selectedLi" />
    </div>
    
</template>
<style lang="scss">
@mixin pad {
    @media(max-width: 1100px) {
        @content;
    }
}
@mixin mobile {
    @media(max-width:768px){
        width: 100%;
        @content;
    }
}

.outBox {
    display: grid;
    gap: 20px;

    @include pad {
        display: flex;
        justify-content: flex-start;
        overflow-x: auto;
        height: 230px;
    }
}

.hints {
    .hint {
        min-width: 260px;
        height: 249px;
        background-color: #DEE0E4;
        border-radius: 8px;
        padding: 20px;

        &__top {

        }

        &__btm {
            display: flex;
        }
    }
}



</style>