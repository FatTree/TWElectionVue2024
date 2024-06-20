<script lang="ts" setup>
type Props = {
    size?: number;
}

const props = withDefaults(defineProps<Props>(), {
    size: 30,
});
</script>
<template>
    <div class="loaderBox">
        <div class="loader" 
            :style="[size ? {width: size + 'px', height: size + 'px', border: Math.round(size/3) +' solid #f5f5f5', borderTop: size/3 +' solid #CCCCCC' } : '']">
        </div>
    </div>
</template>
<style lang="scss">
.loaderBox {
    display: grid;
    place-content: center;
    height: 100%;
    width: 100%;
    
    >.loader {
        border: 10px solid $bgc;
        border-radius: 50%;
        border-top: 10px solid $white-normal-active;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
    }
}

/* Safari */
@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>