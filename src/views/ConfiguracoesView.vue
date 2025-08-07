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
                interface="popover"
                @ionChange="mudouIdioma"
                slot="end"
                :placeholder="opcoesIdioma.find(opcao => opcao.value === idioma)?.label"
                :value="idioma"
              >
                <ion-select-option
                  v-for="opcao in opcoesIdioma"
                  :key="opcao.value"
                  :value="opcao.value"
                >
                  {{ opcao.label }}
                </ion-select-option>
              </ion-select>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="12" class="ion-text-center ion-padding -mt-25">
            <ion-button
              expand="block"
              class="ion-margin-top ion-margin-bottom"
              @click="abreModalSobre"
            >
              {{ $t("sobre") }}
            </ion-button>
          </ion-col>
        </ion-row>

        <sobre-modal
          @setOpen="(e) => (modalSobreEhAberto = e)"
          :isOpen="modalSobreEhAberto"
        >
        </sobre-modal>

        <!-- Icone not found (adicionar depois nos créditos) -->
        <!-- <a href="https://www.flaticon.com/free-icons/page-not-found" title="page not found icons">Page not found icons created by Roundicons Premium - Flaticon</a> -->
        <!-- Icone imagem quebrada -->
        <!-- <a href="https://www.flaticon.com/br/icones-gratis/sem-imagem" title="sem imagem ícones">Sem imagem ícones criados por sonnycandra - Flaticon</a> -->
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
import { configuracoesMixin } from "@/mixins/configuracoesMixin";
import { useStore } from "@/store";
import { Preferences } from "@capacitor/preferences";
import SobreModal from "@/components/SobreModal.vue";

export default defineComponent({
  name: "ConfiguracoesView",
  mixins: [configuracoesMixin],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonToggle,
    IonSelect,
    SobreModal,
  },
  data() {
    return {
      modoDark: false,
      idioma: "pt-br",
      store: useStore(),
      modalSobreEhAberto: false,
    };
  },
  async mounted() {
    await this.carregaModoDark();
    await this.carregarIdioma();
    this.modoDark = this.store.state.configuracoes.modoDark;
  },
  computed: {
    modoDarkText() {
      return this.modoDark ? this.$t("ativo") : this.$t("inativo");
    },
    opcoesIdioma() {
      return [
        { value: "pt-br", label: this.$t("ptbr") },
        { value: "en-us", label: this.$t("enus") },
        { value: "es-es", label: this.$t("eses") },
      ];
    },
  },
  methods: {
    abreModalSobre() {
      this.modalSobreEhAberto = !this.modalSobreEhAberto;
    },
    async toggleDarkMode(event: ToggleCustomEvent<{ checked: boolean }>) {
      this.modoDark = event.detail.checked;
      await Preferences.set({
        key: "modoDark",
        value: this.modoDark.toString(),
      });
      document.documentElement.classList.toggle(
        "ion-palette-dark",
        this.modoDark
      );
    },
    async mudouIdioma($event: any) {
      this.idioma = this.fixBugIdioma($event.detail.value);
      this.$i18n.locale = this.idioma;
      await Preferences.set({
        key: "idioma",
        value: this.idioma.toLowerCase(),
      });
    },
    async carregarIdioma() {
      if (!(await Preferences.get({ key: "idioma" })).value) {
        await Preferences.set({ key: "idioma", value: "pt-br" });
      }

      const idioma = (
        (await Preferences.get({ key: "idioma" })).value || "pt-br"
      ).toLowerCase();
      this.$i18n.locale = idioma;
      this.idioma = idioma;
    },
    fixBugIdioma(idioma: string) {
      switch (idioma) {
        case this.opcoesIdioma[0].label:
          return "pt-br";
        case this.opcoesIdioma[1].label:
          return "en-us";
        case this.opcoesIdioma[2].label:
          return "es-es";
        default:
          return "pt-br";
      }
    }
  },
});
</script>

<style scoped>
.-mt-25 {
  margin-top: -25px;
}
</style>
