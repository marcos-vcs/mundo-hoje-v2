<template>
  <ion-card @click="onClickCard">
    <ion-card-header>
      <ion-card-title>{{ item.titulo }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="imagem-container">
        <ion-skeleton-text v-if="loading" animated class="imagem-card" />
        <img
          v-show="!loading && calculaLinkImagem !== semImagem"
          :src="calculaLinkImagem"
          class="imagem-card"
          @load="loading = false"
        />
        <img
          v-show="!loading && calculaLinkImagem === semImagem"
          :src="calculaLinkImagem"
          class="sem-imagem"
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
              <ion-button class="btn-size" @click.stop="favoritarNoticia">
                <ion-icon :icon="iconeFavorito" slot="icon-only" />
              </ion-button>
              <ion-button class="btn-size" @click.stop="compartilharNoticia">
                <ion-icon :icon="shareSocialOutline" slot="icon-only" />
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
import { shareSocialOutline, heartOutline, heart } from "ionicons/icons";
import { Share } from "@capacitor/share";

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
      heartOutline,
      heart,
      semImagem: "../../public/sem-imagem.png",
    };
  },
  emits: ["clickCard", "favoritarNoticia"],
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
    calculaLinkImagem() {
      return this.item.imagens.image_intro
        ? this.item.imagens.image_intro
        : this.semImagem;
    },
    iconeFavorito() {
      return this.item.favorito ? this.heart : this.heartOutline;
    },
  },
  methods: {
    onClickCard() {
      this.$emit("clickCard", this.item);
    },
    async compartilharNoticia() {
      try {
        await Share.share({
          title: this.item.titulo,
          text: this.item.introducao,
          url: this.item.link,
          dialogTitle: "Compartilhar notícia", // título do diálogo no Android
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    },
    async favoritarNoticia() {
      this.$emit("favoritarNoticia", this.item);
    },
  },
});
</script>

<style scoped>
.sem-imagem {
  width: 50%;
  border-radius: 8px;
  object-fit: fill;
}

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
  text-align: center;
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
