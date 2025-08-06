<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { configuracoesMixin } from "@/mixins/configuracoesMixin";
import { Preferences } from '@capacitor/preferences';
import { favoritosMixin } from "./mixins/favoritosMixin";
import { useStore } from "@/store";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  data() {
    return {
      $store: useStore(),
    };
  },
  mixins: [configuracoesMixin, favoritosMixin],
  async mounted() {
    await this.carregaModoDark();
    await this.carregarIdioma();
    this.$store.commit("setQtdNoticiasFavoritas", await this.buscaQtdNoticiasFavoritas());
  },
  methods: {
    async carregarIdioma() {
      if (!(await Preferences.get({ key: 'idioma' })).value) {
        await Preferences.set({ key: 'idioma', value: 'pt-br' });
      }

      const idioma = ((await Preferences.get({ key: 'idioma' })).value || "pt-br").toLowerCase();
      this.$i18n.locale = idioma;
    },
  },
});
</script>
