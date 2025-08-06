<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="inicio" href="/tabs/inicio">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>{{ $t("inicio") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favoritos" href="/tabs/favoritos">
          <ion-icon aria-hidden="true" :icon="heart" />
          <ion-label>{{ $t("favoritos") }}</ion-label>
          <ion-badge v-show="qtdNoticiasFavoritas > 0" color="danger">{{
            qtdNoticiasFavoritas
          }}</ion-badge>
        </ion-tab-button>

        <ion-tab-button tab="configuracoes" href="/tabs/configuracoes">
          <ion-icon aria-hidden="true" :icon="settings" />
          <ion-label>{{ $t("configuracoes") }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonBadge,
} from "@ionic/vue";
import { settings, home, heart } from "ionicons/icons";
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "TabsPage",
  components: {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonBadge,
  },
  data() {
    return {
      home,
      heart,
      settings,
      $store: useStore(),
    };
  },
  computed: {
    qtdNoticiasFavoritas(): number {
      return this.$store.state.qtdNoticiasFavoritas || 0;
    },
  },
});
</script>
