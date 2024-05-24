<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { sortTicketFun } from '~/formatters/DataFormatter';
import { useTicketStore } from '~/stores/useTicketStore';
import type { AreaSelectedViewModel, AreaViewModel, TicketViewModel } from '~/viewModels/DataViewModel';
import { PARTY, AREA } from '../assets/enum/enum';

type Props = {
    id: string;
    type: string;
    code: string;
    list: TicketViewModel[];
    areaVM?: AreaSelectedViewModel;
    liVM?: AreaSelectedViewModel;
    isOverall?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    id: '1f7d9f4f6bfe06fdaf4db7df2ed4d60c',
    type: AREA.NATION,
    code: '00_000_00_000_0000',
    list: ()=>([]),
    isOverall: false,
});

const viewModel: Ref<AreaSelectedViewModel | undefined> = ref();

const profileStore = useProfileStore();

const { 
} = storeToRefs(profileStore);


const pieContent = ref('generatePie');
const pieBG = computed(() => (`conic-gradient(${pieContent.value})`));
const sortedTicketList = computed( () => props.list.sort(sortTicketFun));
const outBoxCss = reactive({
    bgc: '#CCCCCC',
    bdrc: "#E6E6E6"
});

const generatePie = (list: TicketViewModel[]) => {
    let prv_rate = 0;
    let conicValue = '';
    for(let i=0; i<list.length; i++) {
        let nowEl = list[i];
        let nowRate = Math.round((nowEl.formatted_ticket_percent / 100) * 360);
        
        if (prv_rate === 0) {
            prv_rate = nowRate;
            conicValue = `${nowEl.party_color} 0deg, ${nowEl.party_color} ${prv_rate}deg`;
            outBoxCss.bdrc = nowEl.party_color;
            switch (outBoxCss.bdrc) {
                case '#8894D8':
                    outBoxCss.bgc = '#edeff9';
                    break;
                case '#6AA27A':
                    outBoxCss.bgc = '#d9efdf';
                    break;
                case '#84CB98':
                    outBoxCss.bgc = '#EDF7F0';
                    break;
                case '#DFA175':
                    outBoxCss.bgc = '#faf1ea';
                    break;
                default:
                    outBoxCss.bgc = '#E6E6E6'
                    break;
            }
            
        } else {
            conicValue += `, ${nowEl.party_color} ${prv_rate}deg, ${nowEl.party_color} ${prv_rate + nowRate}deg`
            prv_rate += nowRate;
        }
    }

    return conicValue;
}

watch(sortedTicketList, () => {
    pieContent.value = generatePie(sortedTicketList.value);
});

onMounted(()=> {
    if (props.liVM) {
        viewModel.value = props.liVM;
    } else if (props.areaVM) {
        viewModel.value = props.areaVM;
    }
    pieContent.value = generatePie(sortedTicketList.value);
});

</script>
<template>
<ClientOnly>
    <Transition name="fade" mode="out-in">
        <div v-if="!list.length && !isOverall" class="ticketBox" :style="{backgroundColor: outBoxCss.bgc, border: '2px solid ' + outBoxCss.bdrc}">
            <div class="TTitle TContent"></div>
            <div class="TContent"></div>
            <div class="TContent"></div>
            <div class="TContent"></div>
        </div>
        <div v-else class="ticketBox" :class="[isOverall ? 'ticketBox--overall' : '']" :style="[isOverall ? {backgroundColor: 'none'} : {backgroundColor: outBoxCss.bgc, border: '2px solid ' + outBoxCss.bdrc}]">
            <h6 class="ticketTitle" v-if="liVM">{{ liVM?.areaName }}</h6>
            <h6 class="ticketTitle" v-else-if="areaVM">{{ areaVM.areaName }}</h6>
            <div v-if="isOverall" class="pie" :style="{background: pieBG}">
                <div class="pie__center"></div>
            </div>
            <div class="ticketGroup" :class="[isOverall ? 'ticketGroup--overall' : '']">
                <div class="ticket"  :class="[isOverall ? 'ticket--overall' : '']"
                    v-for="(item, i) in sortedTicketList" :key="i">
                    <div class="ticket__number">
                        <p :style="{ backgroundColor: item.party_color }">{{ item.cand_no }}</p>
                    </div>
                    <div class="ticket__name" :style="{ borderRightColor: item.party_color }">
                        <h6 class="ticket__name__party" :class="[isOverall ? 'ticket__name__party--overall' : '']">{{ item.party_name }}</h6>
                        <p class="ticket__name__cand" :class="[isOverall ? 'ticket__name__cand--overall' : '']">{{ item.cand_name }} | {{ item.vice }}</p>
                    </div>
                    <div class="ticket__result">
                        <p class="ticket__result__percent" :class="[isOverall ? 'ticket__result__percent--overall' : '']">{{ item.formatted_ticket_percent }} %</p>
                        <p class="ticket__result__ticket" :class="[isOverall ? 'ticket__result__ticket--overall' : '']">{{ item.formatted_ticket_num }}票</p>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</ClientOnly>
</template>

<style lang="scss">
@import '../assets/_color';
@import '../assets/_font';
@import '../assets/_share';

@mixin pad {
    @media(max-width: 1100px) {
        @content;
    }
}
@mixin mobile {
    @media(max-width:768px){
        @content;
    }
}

@keyframes gradient {
	0% {
		background-position: 100%;
	}
	100% {
		background-position: 0%;
	}
}

.fade-enter-active,
.fade-leave-active {
    transition: all .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.ticketBox {
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

    &--overall {
        background-color: none;
        padding: 0 0 0;

        @include pad {
            padding-top: 0;
            display: block;
        }

        @include mobile {
            margin-top: 2em;
            align-items: center;
            display: flex;
            row-gap: 20px;
        }
    }

    > .ticketTitle {
        @include h6;
    }

    
    > .ticketGroup {
        display: block;

        @include pad {
            margin-left: 0;
        }

        &--overall {
            @include mobile {
                margin-left: 20px;
            }
        }
        
        > .ticket {
            display: flex;
            &:not(:first-child) {
                margin-top: 1em;
            }
            + .ticket--overall {
                @include mobile {
                    &:not(:first-child) {
                        margin-top: .5em;
                    }
                }
            }
        
            > .ticket__number {
                display: flex;
                align-items: center;
                margin-right: 1em;
                
                > p {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    text-align: center;
                    color: $white-normal;
                }
            }
        
            > .ticket__name {
                margin-right: 1em;
                border-right: 3px solid #000;
                min-width: 104px;
                max-width: 104px;
                > .ticket__name__party {
                    @include Title-B;
                }

                @include mobile {
                    > .ticket__name__party--overall {
                        @include Title-B-12;
                    }
                }
        
                > .ticket__name__cand {
                    @include T-XS;
                    @include fontWeight-regular;
                    +--overall {
                        @include T-XS;
                    }
                }
            }

            >.ticket__result {
                > .ticket__result__percent {
                    @include Title-B;
                }
                @include mobile {
                    > .ticket__result__percent--overall {
                        @include Title-B-12;
                    }
                }
                > .ticket__result__ticket {
                    @include T-XS;
                    +--overall {
                        @include T-XS;
                    }
                }
            }
        }
    }
}
</style>