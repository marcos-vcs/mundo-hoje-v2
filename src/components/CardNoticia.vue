<template>
  <ion-card @click="onClickCard">
    <ion-card-header>
      <ion-card-title>{{ item.titulo }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="imagem-container">
        <ion-skeleton-text v-if="loading" animated class="imagem-card" />
        <img
          v-show="!loading"
          :src="item.imagens.image_intro"
          class="imagem-card"
          @load="loading = false"
        />
      </div>
      <ion-card-subtitle>
        <div class="subtitle-container">
          <div class="subtitle">
            {{ publicadoEmSubtitle }}
          </div>
          <div class="botoes-card">
            <ion-buttons slot="end">
              <ion-button class="btn-size" @click.stop="compartilharNoticia">
                <ion-icon
                  :icon="shareSocialOutline"
                  slot="icon-only"
                />
              </ion-button>
            </ion-buttons>
          </div>
        </div>
      </ion-card-subtitle>
      <p class="introducao">{{ item.introducao }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ItemNoticia } from "@/models/itemNoticia";
import { shareSocialOutline } from "ionicons/icons";

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
      shareSocialOutline,
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
    },
  },
  methods: {
    onClickCard() {
      this.$emit("clickCard", this.item);
    },
    compartilharNoticia() {
      const url = this.item.link;
      if (navigator.share) {
        navigator
          .share({
            title: this.item.titulo,
            text: this.item.introducao,
            url: url,
          })
          .catch((error) => console.error("Erro ao compartilhar:", error));
      } else {
        console.warn("Compartilhamento não suportado neste navegador.");
      }
    },
  },
});
</script>

<style scoped>
.btn-size {
  width: 45px !important;
  height: 45px !important;
}



.subtitle-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.botoes-card {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

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
  margin-top: 10px;
}
</style>
