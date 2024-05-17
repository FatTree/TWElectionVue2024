<script lang="ts" setup>
import { onMounted, onBeforeMount, onUpdated } from 'vue';
import { storeToRefs } from 'pinia';
import { useProfileStore } from '~/stores/useProfileStore';

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


const store = useProfileStore();
const overallStore = useOverallStore();

const { getProfileList } = store;
const { 
    formatted_invalid_ticket,
    formatted_valid_ticket,
    formatted_vote_ticket,
    formatted_vote_to_elect,
    profileView,
} = storeToRefs(store);

const {
    OAAreaVM,
    OACode,
    OAType,
    OALiCode,
} = storeToRefs(overallStore);

watch( OAAreaVM, async() => {
    if (OAType.value.trim() === 'L') {
        await getProfileList(props.id, OAType.value, OACode.value, OAAreaVM.value, OALiCode.value);
    } else {
        await getProfileList(props.id, OAType.value, OACode.value, OAAreaVM.value);
    }
});

const deg = ref(`90deg`);
const pieBG = computed(() => (`conic-gradient(#262E49 0, #262E49 ${deg.value}, #BFBFBF ${deg.value})`))

watch(formatted_vote_to_elect, () => {
    deg.value = `${formatted_vote_to_elect.value / 100 * 360}deg`;
});

await getProfileList(props.id, props.type, props.code);

onMounted( async() => {
    deg.value = `${formatted_vote_to_elect.value / 100 * 360}deg`;
})


</script>
<template>
    <div class="profile">
        <div class="profile__top">
            <div id="pie1" class="pie" :style="{background: pieBG}">
                <div class="pie__center"></div>
            </div>
            <div class="profile__top__rate">
                <p class="number">{{ formatted_vote_to_elect }}%</p>
                <p class="word">投票率</p>
            </div>
        </div>
        <div class="profile__buttom">
            <p>投票數: <label>{{ formatted_vote_ticket }} 票</label></p>
            <p>有效票數: <label>{{ formatted_valid_ticket }} 票</label></p>
            <p>無效票數: <label>{{ formatted_invalid_ticket }} 票</label></p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '../assets/_color';
@import '../assets/_font';
@import '../assets/_share';
/* :root {
    --theAngle: 45deg;
} */
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
.profile {
    display: grid;
    row-gap: 20px;
    
    @include pad {
        display: grid;
        row-gap: 0;
    }

    @include mobile {
        display: flex;
        gap: 12px
    }
    &__title {
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        margin-bottom: 20px;
    }

    &__top {
        display: flex;
        /* margin-bottom: 20px; */

        @include pie;

        &__rate {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-left: 20px;
            > .number {
                @include h6;
            }
            > .word {
                @include T-RG;
            }
        }
    }
    &__buttom {
        > P {
            @include T-RG;
            @include fontWeight-regular;
            
            &:not(:last-child) {
                margin-bottom: .5em;
            }

            > label {
                @include T-XS;
                @include fontWeight-blod;
            }
        }
    }
}
@-webkit-keyframes a1{
    0%{ 
        transform:rotate(-90deg);
    }
    100%{ 
        transform:rotate(270deg);
    }
}
@-webkit-keyframes a2{
    0%{
        opacity:0;
    }
    49.99%{
        opacity:0;
    }
    50%{
        opacity:1;
    }
    100%{
        opacity:1;
    }
}
@-webkit-keyframes a{
    0%{
        margin-left:50px;
        width:50px;
        border-radius:0 50px 50px 0;
    }
    49.99%{
        margin-left:50px;
        width:50px;
        border-radius:0 50px 50px 0;
    }
    50%{
        margin-left:0;
        width:100px;
        border-radius:0;
    }
    100%{
        margin-left:0;
        width:100px;
        border-radius:0;
    }
}
</style>