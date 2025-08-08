<template>
  <ion-modal :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("sobre") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="setOpen(false)">
            <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-text>
        <h2 class="titulo-1">
          <span
            >{{ $t("sobre_titulo_1") }} <strong>{{ $t("mundo_hoje") }}</strong
            >!</span
          >
          <img
            src="../../dist/favicon.png"
            alt="Mundo hoje ícone"
            width="35px"
          />
        </h2>
        <p>
          {{ $t("sobre_paragrafo_1") }}
          <strong>{{ $t("sobre_paragrafo_2") }}</strong
          >,
          {{ $t("sobre_paragrafo_3") }}
        </p>

        <h3 class="mt-30">{{ $t("sobre_titulo_2") }}</h3>
        <p>
          {{ $t("sobre_paragrafo_4") }}
        </p>

        <h3 class="mt-30">{{ $t("sobre_titulo_3") }}</h3>
        <ul>
          <li>
            {{ $t("sobre_li_1") }}
            <a
              href="https://www.flaticon.com/free-icons/page-not-found"
              target="_blank"
              rel="noopener noreferrer"
            >
              Roundicons Premium - Flaticon
            </a>
          </li>
          <li>
            {{ $t("sobre_li_2") }}
            <a
              href="https://www.flaticon.com/br/icones-gratis/sem-imagem"
              target="_blank"
              rel="noopener noreferrer"
            >
              sonnycandra - Flaticon
            </a>
          </li>
        </ul>

        <h3 class="mt-30">{{ $t("sobre_titulo_4") }}</h3>
      </ion-text>

      <ion-list>
        <ion-item
          button
          detail
          href="http://marcos-vcs-dev.vercel.app/"
          target="_blank"
        >
          🌐 {{ $t("portifolio") }}
        </ion-item>
        <ion-item
          button
          detail
          href="https://github.com/marcos-vcs"
          target="_blank"
        >
          💻 {{ $t("github") }}
        </ion-item>
        <ion-item
          button
          detail
          href="https://www.linkedin.com/in/marcos-sousa-mvcs/"
          target="_blank"
        >
          🔗 {{ $t("linkedin") }}
        </ion-item>
        <ion-item
          button
          detail
          href="https://github.com/marcos-vcs/mundo-hoje-v2"
          target="_blank"
        >
          📁 {{ $t("repositorio_projeto") }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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

export default defineComponent({
  name: "SobreModal",
  emits: ["setOpen"],
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
  },
  data() {
    return {
      closeOutline,
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    setOpen(value: boolean) {
      this.$emit("setOpen", value);
    },
  },
});
</script>

<style scoped>
.titulo-1 {
  margin-top: 0;
  font-size: 1.5em;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 7.5px;
}

.mt-30 {
  margin-top: 30px;
}
</style>
