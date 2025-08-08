<template>
  <ion-modal :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("detalhes_noticia") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button class="btn-size" @click.stop="compartilharNoticia">
            <ion-icon :icon="shareSocialOutline" slot="icon-only" />
          </ion-button>
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
          :src="item.imagens?.image_fulltext"
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
              style="width: 100%; height: 50px;"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 100%; height: 14px; margin-top: 10px; margin-bottom: 30px;"
            ></ion-skeleton-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-margin-top">
          <ion-col size="12">
            <ion-skeleton-text
              animated
              style="width: 100%; height: 180px; border-radius: 10px; margin-bottom: 40px;"
            ></ion-skeleton-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-margin-top">
          <ion-col size="12">
            <ion-skeleton-text
              animated
              style="width: 100%; height: 20px;"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 95%; height: 20px; margin-top: 10px;"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 98%; height: 20px; margin-top: 10px;"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 60%; height: 20px; margin-top: 10px; margin-bottom: 30px;"
            ></ion-skeleton-text>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-top">
          <ion-col size="12">
            <ion-skeleton-text
              animated
              style="width: 100%; height: 20px;"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 95%; height: 20px; margin-top: 10px;"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 98%; height: 20px; margin-top: 10px;"
            ></ion-skeleton-text>
            <ion-skeleton-text
              animated
              style="width: 60%; height: 20px; margin-top: 10px;"
            ></ion-skeleton-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { closeOutline, shareSocialOutline } from "ionicons/icons";
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
import { Share } from "@capacitor/share";

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
      default: Object as PropType<ItemNoticia>,
    },
    resultadoScraping: {
      type: Object as PropType<ScrapingNoticia>,
      default: Object as PropType<ScrapingNoticia>,
    },
  },
  data() {
    return {
      closeOutline: closeOutline,
      shareSocialOutline: shareSocialOutline,
      loadingFoto: false,
    };
  },
  methods: {
    setOpen(value: boolean) {
      this.$emit("setOpen", value);
    },
    async compartilharNoticia() {
      try {
        await Share.share({
          title: this.item.titulo,
          text: this.item.introducao,
          url: this.item.link,
          dialogTitle: this.$t("compartilhar_noticia"),
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
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
