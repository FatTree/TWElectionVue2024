<script setup>

</script>
<template>
    <div class="loader"></div>
</template>
<style lang="scss">
@import '../assets/_color';
.loader {
    border: 10px solid $bgc;
    border-radius: 50%;
    border-top: 10px solid $white-normal-active;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
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