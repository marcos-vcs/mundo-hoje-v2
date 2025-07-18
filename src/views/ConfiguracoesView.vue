<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("configuracoes") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t("configuracoes") }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid>
        <!-- Modo dark -->
        <ion-row>
          <ion-col size="12" class="ion-text-center ion-padding">
            <ion-item lines="none" class="br-15">
              <ion-label>
                {{ $t("dark_mode") }}:
                <span>{{ modoDarkText }}</span>
              </ion-label>
              <ion-toggle
                :checked="modoDark"
                @ionChange="toggleDarkMode($event)"
                slot="end"
              />
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  ToggleCustomEvent,
  IonToggle,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfiguracoesView",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonToggle,
  },
  data() {
    return {
      modoDark: false,
    };
  },
  mounted() {
    this.carregaModoDark();
  },
  computed: {
    modoDarkText() {
      return this.modoDark ? this.$t("ativo") : this.$t("inativo");
    },
  },
  methods: {
    toggleDarkMode(event: ToggleCustomEvent<{ checked: boolean }>) {
      this.modoDark = event.detail.checked;
      localStorage.setItem("modoDark", this.modoDark.toString());
      document.documentElement.classList.toggle(
        "ion-palette-dark",
        this.modoDark
      );
    },
    carregaModoDark() {
      if (!localStorage.getItem("modoDark")) {
        localStorage.setItem(
          "modoDark",
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "true"
            : "false"
        );
      }

      const modoDark = localStorage.getItem("modoDark");
      this.modoDark = modoDark === "true";
      document.documentElement.classList.toggle(
        "ion-palette-dark",
        this.modoDark
      );
    },
  },
});
</script>

<style scoped>
.br-15 {
  border-radius: 15px;
}
</style>
