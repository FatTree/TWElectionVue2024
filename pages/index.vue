<script lang="ts" setup>
const { locale, setLocale } = useI18n();

const { data } = await useFetch(`/api/movies/jjj`)

// if (!data.value) {
//     throw createError({
//         statusCode: 404,
//         statusMessage: 'Page Not Found'
//     })
// }

</script>
<template>
    <div>
        <h1>My Page</h1>
        <NuxtErrorBoundary>
            <!-- You use the default slot to render your content -->
            <template #error="{ error, clearError }">
                You can display the error locally here: {{ error }}
                <button @click="clearError">
                    This will clear the error.
                </button>
            </template>
        </NuxtErrorBoundary>
    </div>
</template>


<style>

</style>