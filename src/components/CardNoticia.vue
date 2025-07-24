<template>
  <ion-card @click="onClickCard">
    <ion-card-header>
      <ion-card-title>{{ item.titulo }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
    <div class="imagem-container">
      <ion-skeleton-text
        v-if="loading"
        animated
        class="imagem-card"
      />
      <img
        v-show="!loading"
        :src="item.imagens.image_intro"
        class="imagem-card"
        @load="loading = false"
      />
    </div>
      <ion-card-subtitle class="subtitle">{{ publicadoEmSubtitle }}</ion-card-subtitle>
      <p class="introducao">{{ item.introducao }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ItemNoticia } from "@/models/itemNoticia";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSkeletonText,
} from "@ionic/vue";

export default defineComponent({
  name: "CardNoticia",
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonSkeletonText,
  },
  data() {
    return {
      loading: true,
    };
  },
  emits: ["clickCard"],
  props: {
    item: {
      type: Object as PropType<ItemNoticia>,
      required: true,
    },
  },
  computed: {
    publicadoEmSubtitle(): string {
      return `${this.$t("publicado_em")}: ${this.item.data_publicacao}`;
    }
  },
  methods: {
    onClickCard() {
      this.$emit("clickCard", this.item);
    }
  },
});
</script>

<style scoped>
.imagem-container {
    width: 100%;
    height: 180px;
    position: relative;
}
.imagem-card {
    width: 100%;
    height: 180px;
    border-radius: 8px;
    object-fit: cover;
}
.introducao {
    font-size: 14px;
    margin-top: 8px;
}

.subtitle {
    font-size: 12px;
    margin-top: 4px;
}
</style>
