<template>
  <div>
    <img
      src="../../public/communication.png"
      alt="Not Found"
      class="not-found-image"
    />
    <ion-grid class="ion-text-center">
      <ion-row>
        <ion-col>
          <h1 class="not-found-title">{{ title }}</h1>
          <p class="not-found-description">
            {{ message }}
          </p>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
  props: {
    title: {
      type: String,
      default: "Página não encontrada",
    },
    message: {
      type: String,
      default: "Página não encontrada",
    },
  },
});
</script>

<style scoped>
.not-found-image {
  padding-top: 35px;
  width: 70%;
  max-width: 300px;
  margin: auto;
  display: block;
}
</style>
