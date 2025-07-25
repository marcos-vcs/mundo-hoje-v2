<template>
  <ion-modal :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("detalhes_noticia") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="setOpen(false)">
            <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="!loading" class="ion-padding">
      <h2>{{ resultadoScraping?.titulo }}</h2>
      <p class="data-publicacao">{{ resultadoScraping?.atualizadoEm }}</p>
      <div class="imagem-container">
        <ion-skeleton-text v-if="loadingFoto" animated class="imagem-detalhe" />
        <img
          :src="item.imagens.image_fulltext"
          @load="loadingFoto = false"
          v-show="!loadingFoto"
          class="imagem-detalhe"
        />
      </div>
      <span v-html="resultadoScraping?.conteudo"></span>
    </ion-content>
    <ion-content v-else>
      <ion-grid class="ion-padding">
        <ion-row>
          <ion-col size="12">
            <ion-skeleton-text
              animated
              style="width: 90%; height: 24px"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 70%; height: 24px; margin-top: 8px"
            ></ion-skeleton-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-margin-top">
          <ion-col size="6">
            <ion-skeleton-text
              animated
              style="width: 60%; height: 14px"
            ></ion-skeleton-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-margin-top">
          <ion-col size="12">
            <ion-skeleton-text
              animated
              style="width: 100%; height: 180px; border-radius: 10px"
            ></ion-skeleton-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-margin-top">
          <ion-col size="12">
            <ion-skeleton-text
              animated
              style="width: 100%; height: 16px"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 95%; height: 16px; margin-top: 8px"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 98%; height: 16px; margin-top: 8px"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 60%; height: 16px; margin-top: 8px"
            ></ion-skeleton-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-margin-top">
          <ion-col size="12">
            <ion-skeleton-text
              animated
              style="width: 100%; height: 16px"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 85%; height: 16px; margin-top: 8px"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 92%; height: 16px; margin-top: 8px"
            ></ion-skeleton-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { closeOutline } from "ionicons/icons";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
} from "@ionic/vue";
import { ItemNoticia } from "@/models/itemNoticia";
import { ScrapingNoticia } from "@/models/scrapingNoticia";

export default defineComponent({
  name: "DetalhesNoticiaModal",
  components: {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
  },
  emits: ["setOpen"],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object as PropType<ItemNoticia>,
      required: true,
    },
    resultadoScraping: {
      type: Object as PropType<ScrapingNoticia>,
      required: false,
    },
  },
  data() {
    return {
      closeOutline: closeOutline,
      loadingFoto: false,
    };
  },
  methods: {
    setOpen(value: boolean) {
      this.$emit("setOpen", value);
    },
  },
});
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.data-publicacao {
  font-size: 0.9rem;
  color: var(--ion-color-medium);
  margin-bottom: 1rem;
}

.imagem-detalhe {
  width: 100%;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
}

</style>
