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
    OAList,
} = storeToRefs(overallStore);

if (type === 'N') {
    await getTicketList(id, type, code);
    OAType.value = type;
    OACode.value = code;
    OAList.value = ticketNationViewList.value;
}

const collapseOverall = () => {
    const target = document.getElementsByClassName('overall__content')[0];
    const icon = document.getElementsByClassName('overall__title__icon')[0];
    target.classList.toggle("collapse");
    icon.classList.toggle("collapse");
}

</script>
<template>
    <div class="options">
        <AreaDropdownGroup :id="id" :type="type" :code="code" />
    </div>
    <div class="content">
        <div class="overall">
            <h1 class="overall__title" @click="collapseOverall">投票概況 
                <label class="overall__title__icon"></label>
            </h1>
            <div class="overall__content">
                <div v-if="OAType === 'N'" class="overall__content__title">
                    <label>全國</label>
                </div>
                <div v-else class="overall__content__title" >
                    <label v-if="selectedCity">{{ selectedCity.areaName }}</label><label v-if="selectedDist"> - {{ selectedDist.areaName}} </label> <label v-if="selectedLi"> - {{ selectedLi.areaName }}</label>
                </div>
                <div class="overall__content__detail">
                    <Profile class="detail" :id="id" :type="OAType" :code="OACode" />
                    <Tickets class="detail" :id="id" :type="OAType" :code="OACode" :list="OAList" :isOverall="true" />
                </div>
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

.options {
    display: flex;
    gap: 20px;
    margin: 20px 0;

    @include pad {
        display: block;
    }
}

.content {
    display: flex;
    justify-content: space-between;

    @include pad {
        display: block;
        width: 100%;
        min-width: 100%;
    }

    > .overall {
        background-color: #fff;
        width: 270px;
        min-width: 270px;
        height: 100%;
        padding: 20px;
        border-radius: 8px;

        @include pad {
            display: block;
            width: 100%;
            max-width: calc(100% - 35px);
        }

        > .overall__title {
            text-wrap: nowrap;
            display: flex;
            justify-content: space-between;
    
            @include pad {
                width: 100%;
                cursor: pointer;
                margin-bottom: 0px;
            }
    
            > .overall__title__icon {
                display: none;
                cursor: pointer;
                width: 24px;
                height: 24px;
                background-image: url('@/assets/png/right-arrow.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: 16px;
                rotate: 0;
                transition: all .2s ease;
        
                @include pad {
                    display: block;
                }
            }

            > .overall__title__icon.collapse {
                rotate: 90deg;
            }
        }

        > .overall__content {
            /* margin-top: 20px; */
            height: 100%;
            opacity: 1;
            transition: all .2s ease-in;

            > .overall__content__title {
                margin-bottom: 15px;
            }
        }

        > .collapse {
            display: block;
            @include pad {
                margin-top: 0;
                opacity: 0;
                /* display: none; */
                height: 0;
            }
        }
        
        > .overall__content > .overall__content__detail {
            justify-content: space-around;
            display: grid;
            row-gap: 40px;
            
            @include pad {
                display: flex;
            }
            @include mobile {
                display: block;
                margin-top: 20px;
            }

            > .detail {
                width: 230px;

                @include mobile {
                    width: 100%;
                }
            }
        }
    }

    > .map {
        width: 30vw;

        @include pad {
            width: 60vw;
            margin: 40px auto;
        }
    }

    > .detail {
        /* overflow: hidden; */
        height: 219px;
    }
}
</style>