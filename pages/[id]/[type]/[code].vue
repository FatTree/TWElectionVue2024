<script lang="ts" setup>
import { useRoute } from '#vue-router';
import { storeToRefs } from 'pinia';
import { useTicketStore } from '~/stores/useTicketStore';

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


// watch(OAAreaVM, async () => {
//     const _type = OAType.value;
//     if (_type === 'L') {
//         await getTicketList(id, OAType.value, OACode.value, OAAreaVM.value, OALiCode.value, OAAreaVM.value);
//     } else {
//         await getTicketList(id, OAType.value, OACode.value, OAAreaVM.value);
//     }
    
//     switch (_type) {
//         case 'C':
//             OAList.value = ticketCityViewList.value;
//             break;
//         case 'D':
//             OAList.value = ticketDistViewList.value;
//             break;
//         case 'L':
//             OAList.value = ticketLiViewList.value;
//             break;
//         default:
//             OAList.value = ticketNationViewList.value;
//             break;
//     }
// });

if (type === 'N') {
    await getTicketList(id, type, code);
    OAType.value = type;
    OACode.value = code;
    OAList.value = ticketNationViewList.value;
}

// const MQ = window.matchMedia("(max-width: 768px)");

const collapseOverall = () => {
    const target = document.getElementsByClassName('overall__content')[0];
    target.classList.toggle("collapse");
    // if(MQ.matches) {
    //     const target = document.getElementsByClassName('overall__content')[0];
    //     target.classList.toggle("collapse");
    // }
}

</script>
<template>
    <div class="options">
        <AreaDropdownGroup :id="id" :type="type" :code="code" />
    </div>
    <div class="content">
        <div class="overall">
            <h1 class="overall__title" @click="collapseOverall">投票概況 <label class="overall__title__icon">**</label></h1>
            <div class="overall__content">
                <div v-if="OAType === 'N'">
                    <label>全國</label>
                </div>
                <div v-else>
                    <label v-if="selectedCity">{{ selectedCity.areaName }}</label><label v-if="selectedDist"> - {{ selectedDist.areaName}} </label> <label v-if="selectedLi"> - {{ selectedLi.areaName }}</label>
                </div>
                <Profile :id="id" :type="OAType" :code="OACode" />
                <Tickets :id="id" :type="OAType" :code="OACode" :list="OAList" :isOverall="true" />
            </div>
        </div>
        <div class="map">
            <Map :id="id" type="C" />
        </div>
        <div class="detail">
            <!-- <h2>Tickets</h2> -->
            <TicketGroup :id="id" :type="type" :code="code" />
        </div>
    </div>
</template>

<style lang="scss">
@mixin mobile {
    @media(max-width:768px){
        width: 100%;
        @content;
    }
}

.options {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    @include mobile {
        display: block;
    }
}

.content {
    display: flex;

    @include mobile {
        display: block;
        width: 100%;
        min-width: 100%;
    }

    > .overall {
        background-color: #fff;
        width: 270px;
        min-width: 270px;
        padding: 20px;
        border-radius: 8px;

        @include mobile {
            display: block;
            width: 100%;
            max-width: calc(100% - 35px);
        }

        > .overall__title {
            text-wrap: nowrap;
    
            @include mobile {
                width: 100%;
                display: flex;
                cursor: pointer;
            }
    
            > .overall__icon {
                display: none;
        
                @include mobile {
                    display: block;
                }
            }
        }
        > .collapse {
            display: none;
        }
        > .overall__content {
            /* display: block; */
        }
    }
}
</style>