<script lang="ts" setup>
import { useRoute } from '#vue-router';
import { storeToRefs } from 'pinia';
import { useTicketStore } from '~/stores/useTicketStore';
import { useOverallStore } from '~/stores/useOverallStore';

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
    districtOption,
} = storeToRefs(areaStore);

const {
    OAType,
    OACode,
    OAList,
    OACCode,
    isOverallLoading,
} = storeToRefs(overallStore);
const {
    setDefaultOverall,
} = overallStore;

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

onMounted(async () => {
    districtOption.value = undefined;
    await setDefaultOverall(id, OAType.value, OACode.value, OACCode.value, OAList.value, [])
})

</script>
<template>
    <NuxtErrorBoundary>
        <div class="options">
            <AreaDropdownGroup :id="id" :type="type" :code="code" />
        </div>
        <div class="content">
            <div class="overall">
                <h1 class="overall__title">
                    {{ $t('overall.overall') }}
                    <label class="overall__title__icon" @click="collapseOverall"></label>
                </h1>
                <div class="overall__content">
                    <div v-if="OAType === 'N'" class="overall__content__title">
                        <label>{{ $t('overall.national') }}</label>
                    </div>
                    <div v-else class="overall__content__title" >
                        <label v-if="selectedCity">{{ selectedCity.areaName }}</label><label v-if="selectedDist"> - {{ selectedDist.areaName}} </label> <label v-if="selectedLi"> - {{ selectedLi.areaName }}</label>
                    </div>
                    <div class="overall__content__detail">
                        <Profile class="detail" :id="id" :type="OAType" :code="OACode" />
                        <Tickets class="detail" :id="id" :type="OAType" :code="OACode" :list="OAList" :isOverall="true" />
                        <!-- <Transition name="fade" mode="out-in">
                            <div v-if="isLoading" class="ticketBox" >
                                <div class="TTitle TContent"></div>
                                <div class="TContent"></div>
                                <div class="TContent"></div>
                                <div class="TContent"></div>
                            </div>
                            <Tickets v-else class="detail" :id="id" :type="OAType" :code="OACode" :list="OAList" :isOverall="true" />
                        </Transition> -->
                    </div>
                </div>
            </div>
            <div class="map">
                <Map :id="id" type="C" />
            </div>
            <div class="detail">
                <TicketGroup :id="id" :type="type" :code="code" />
            </div>
        </div>
        <template #error="{ error }">
            <error :error="error" />
        </template>
    </NuxtErrorBoundary>
</template>

<style lang="scss">
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
        width: 260px;
        min-width: 260px;
        height: 100%;
        padding: 20px;
        border-radius: 8px;
        display: block;

        @include pad {
            width: 100%;
            max-width: calc(100% - 35px);
        }

        > .overall__title {
            text-wrap: nowrap;
            display: flex;
            justify-content: space-between;
    
            @include pad {
                width: 100%;
                margin-bottom: 0px;
            }
    
            > .overall__title__icon {
                display: none;
                cursor: pointer;
                width: 24px;
                height: 24px;
                background-image: url('@/assets/png/chevron-right-solid.svg');
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
            height: 100%;
            opacity: 1;
            transition: all .3s ease-in;

            > .overall__content__title {
                height: 1.5em;
                margin-bottom: 15px;
            }
        }

        > .collapse {
            display: none;
            @include pad {
                margin-top: 0;
                opacity: 0;
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

            /* .ticketBox {
                display: grid;
                row-gap: 12px;
                padding: 12px 20px;
                border-radius: 8px;
                min-width: 250px;
                min-height: 190px;

                @include pie;

                > .TContent {
                    height: 1.5em;
                    width: 100%;
                    background: linear-gradient(45deg, $white-normal-hover, $white-normal-active, $white-normal-hover, $white-normal-active);
                    animation: gradient 1s infinite linear;
                    background-size: 300% 300%;
                }
                > .TTitle {
                    height: 2em;
                    width: 8em;
                }
            } */
        }
    }

    > .map {
        width: 30vw;
        margin: 40px auto 0;

        @include pad {
            width: 60vw;
            margin-bottom: 40px;
        }
    }
}
</style>