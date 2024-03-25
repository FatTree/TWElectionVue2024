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

watch(formatted_vote_to_elect, () => {
    const pie: HTMLElement = document.querySelector('.pie')!;
    pie.style.setProperty('--deg', `${formatted_vote_to_elect.value / 100 * 360}deg`);
});

await getProfileList(props.id, props.type, props.code);

</script>
<template>
    <div class="profile">
        <!-- <h1 class="profile__title">投票概況 </h1> -->
        <div class="profile__top">
            <div class="pie" style="--deg: 270deg">
                <div class="pie__center"></div>
            </div>
            <div class="profile__top__rate">
                <p class="number">{{ formatted_vote_to_elect }} %</p>
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
/* :root {
    --theAngle: 45deg;
} */

@keyframes spin {
	to { transform: rotate(.5turn); }
}

@keyframes bg {
	50% { background: #655; }
}
.profile {
    &__title {
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        margin-bottom: 20px;
    }

    &__top {
        display: flex;
        margin-bottom: 20px;

        > .pie {
            --deg: 45deg;
            min-width: 120px;
            min-height: 120px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: conic-gradient($indigo-normal 0, $indigo-normal var(--deg), $white-dark var(--deg));
            display: flex;
            align-items: center;
            justify-content: center;
            /* animation: spin 3s linear infinite, bg 6s step-end infinite; */

            > .pie__center {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background-color: $white-normal;
            }
        }

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
        margin-bottom: 20px;

        > P {
            @include T-RG;
            @include fontWeight-regular;
            
            &:not(:last-child) {
                margin-bottom: 8px;
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