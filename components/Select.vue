<script lang="ts" setup>

type Props = {
    optionList: Array<string>,
}
const props = withDefaults(defineProps<Props>(), {
    optionList: () => (['aaa', 'ddd', 'dsaf']),
    // optionList: () => ([]),
});

const selected = ref('please select...');

const clickSelect = () => {
    if (!props.optionList.length) return;
    const options = document.getElementsByClassName('select__options')[0];
    const selects = document.getElementsByClassName('select')[0];
    options.classList.toggle('none');
    selects.classList.toggle('select--selected');
}

const clickOption = (v: string) => {
    selected.value = v;
}

</script>

<template>
<div class="select" 
    @click="clickSelect"
    :class="optionList.length ? '' : 'disabled'">
    <div class="selected">{{ selected }}</div>
    <div class="select__options none">
        <div class="options__option" 
            @click="clickOption(t)"
            v-for="t in optionList" 
            :value="t">{{ t }}</div>
    </div>
    <select v-model="selected">
        <option value="0">Select car:</option>
        <option v-for="t in optionList" :value="t">{{ t }}</option>
    </select>
</div>
</template>


<style lang="scss" scoped>
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

.select {
    border: 1px solid $white-normal-hover;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    height: 36px;
    position: relative;

    &~.disabled {
        background-color: $white-dark;
        cursor: not-allowed;
    }

    &--selected {
        border: 1px solid $indigo-normal;
    }

    &::after {
        position: absolute;
        content: '';
        width: 24px;
        height: 24px;
        background-image: url(/_nuxt/assets/png/right-arrow.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 16px;
        rotate: 90deg;
        right: 0.4em;
        top: 0.4em;
    }

    > select {
        display: none;
    }

    > .selected {
        position: absolute;
        top: 0;
        left: 0;
        @include select-T;
        padding: .3em;
    }

    > .select__options.none {
        display: none;
    }
    > .select__options {
        border: 1px solid $indigo-normal;
        background-color: #fff;
        border-radius: 8px;
        position: absolute;
        top: 40px;
        width: 100%;
        overflow: hidden;

        .options__option {
            @include select-T;
            padding: .3em;

            &:hover {
                background-color: $white-normal-hover;
            }
        }
    }
}

</style>