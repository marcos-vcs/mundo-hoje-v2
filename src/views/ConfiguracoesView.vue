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

        <!-- Idioma -->
        <ion-row>
          <ion-col size="12" class="ion-text-center ion-padding">
            <ion-item lines="none" class="br-15 -mt-20">
              <ion-label>{{ $t("idioma") }}:</ion-label>
              <ion-select
                :value="idioma"
                @ionChange="mudouIdioma($event)"
                slot="end"
              >
                <ion-select-option value="pt-br">{{ $t("ptbr") }}</ion-select-option>
                <ion-select-option value="en-us">{{ $t("enus") }}</ion-select-option>
                <ion-select-option value="es-es">{{ $t("eses") }}</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-col>
        </ion-row>

        <!-- Icone not found (adicionar depois nos créditos) -->
         <!-- <a href="https://www.flaticon.com/free-icons/page-not-found" title="page not found icons">Page not found icons created by Roundicons Premium - Flaticon</a> -->
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
  IonSelect,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {configuracoesMixin} from "@/mixins/configuracoesMixin";
import { useStore } from "@/store";

export default defineComponent({
  name: "ConfiguracoesView",
  mixins: [
    configuracoesMixin,
  ],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonToggle,
    IonSelect,
  },
  data() {
    return {
      modoDark: false,
      idioma: 'pt-br',
      store: useStore(),
    };
  },
  mounted() {
    this.carregaModoDark();
    this.modoDark = this.store.state.configuracoes.modoDark;
    this.carregarIdioma();
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
    mudouIdioma(event: any) {
      this.idioma = event.detail.value;
      localStorage.setItem("idioma", this.idioma.toLowerCase());
      this.$i18n.locale = this.idioma;
    },
    carregarIdioma() {
      if (!localStorage.getItem("idioma")) {
        localStorage.setItem("idioma", window.navigator.language.toLowerCase() || "pt-br");
      }

      const idioma = (localStorage.getItem("idioma") || "pt-br").toLowerCase();
      this.$i18n.locale = idioma;
      this.idioma = idioma;
    },
  },
});
</script>

<style scoped>
</style>
