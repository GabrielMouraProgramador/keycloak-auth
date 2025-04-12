<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})
</script>


<template>
    <VContainer fluid class="fill-height">
      <VRow no-gutters align="center" justify="center" class="fill-height">
        <VCol cols="12" md="6" lg="5" sm="6">
          <VRow no-gutters align="center" justify="center">
            <VCol cols="12" md="6">
              <h1>Você já está logado</h1>
              <p class="text-medium-emphasis">Área segura e autenticidade
            </p>        
            </VCol>
          </VRow>
        </VCol>
        <VCol class="hidden-md-and-down fill-height" md="6" lg="7">
          <VImg
            src="https://wallpaper.dog/large/5557744.jpg"
            cover
            class="h-100 rounded-xl d-flex align-center justify-center"
          >
            <div class="text-center w-50 text-white mx-auto">
      
            </div>
          </VImg>
        </VCol>
      </VRow>
    </VContainer>
  </template>
