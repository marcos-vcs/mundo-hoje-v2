<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { configuracoesMixin } from "@/mixins/configuracoesMixin";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  mixins: [configuracoesMixin],
  mounted() {
    this.carregaModoDark();
    this.carregarIdioma();
  },
  methods: {
    carregarIdioma() {
      if (!localStorage.getItem("idioma")) {
        localStorage.setItem("idioma", "pt-br");
      }

      const idioma = (localStorage.getItem("idioma") || "pt-br").toLowerCase();
      this.$i18n.locale = idioma;
    },
  },
});
</script>
