<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("favoritos") }}</ion-title>
      </ion-toolbar>
      <ion-toolbar style="margin-top: -5px">
        <BarraPesquisa ref="barraPesquisa" />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t("favoritos") }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <CardNoticia v-for="item in noticia.items" :key="item.id" :item="item" />

      <NotFound
        :title="$t('notfound_title')"
        :message="$t('notfound_description')"
        v-show="!noticia.items && !loading"
      />
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
} from "@ionic/vue";
import BarraPesquisa from "@/components/BarraPesquisa.vue";
import CardNoticia from "@/components/CardNoticia.vue";
import { Noticia } from "@/models/noticia";
import { defineComponent } from "vue";
import NotFound from "@/components/NotFound.vue";

export default defineComponent({
  name: "FavoritosPage",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    BarraPesquisa,
    CardNoticia,
    NotFound,
  },
  data() {
    return {
      noticia: {} as Noticia,
      loading: false,
    };
  },
  methods: {},
});
</script>
