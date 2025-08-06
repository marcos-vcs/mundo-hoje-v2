<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("favoritos") }}</ion-title>
      </ion-toolbar>
      <ion-toolbar style="margin-top: -5px">
        <BarraPesquisa ref="barraPesquisa" @pesquisou="pesquisouNoticia" />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t("favoritos") }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-refresher slot="fixed" @ionRefresh="reset">
        <ion-refresher-content />
      </ion-refresher>

      <CardNoticia
        v-for="item in items"
        :key="item.id"
        :item="item"
        @favoritar-noticia="
          favoritarNoticia($event);
          reset(null);
        "
      />

      <NotFound
        :title="$t('notfound_title')"
        :message="$t('notfound_description')"
        v-show="!items || items.length === 0"
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
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import BarraPesquisa from "@/components/BarraPesquisa.vue";
import CardNoticia from "@/components/CardNoticia.vue";
import { defineComponent } from "vue";
import NotFound from "@/components/NotFound.vue";
import { useStore } from "@/store";
import { ItemNoticia } from "@/models/itemNoticia";
import { favoritosMixin } from "@/mixins/favoritosMixin";

export default defineComponent({
  name: "FavoritosPage",
  mixins: [favoritosMixin],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    BarraPesquisa,
    CardNoticia,
    NotFound,
    IonRefresher,
    IonRefresherContent,
  },
  data() {
    return {
      items: [] as ItemNoticia[],
      $store: useStore(),
    };
  },
  async mounted() {
    this.items = await this.carregarNoticiasFavoritas();
    this.atualizarQtdNoticiasFavoritas();
  },
  computed: {
    qtdNoticiasFavoritas(): number {
      return this.$store.state.qtdNoticiasFavoritas || 0;
    },
  },
  watch: {
    qtdNoticiasFavoritas() {
      this.reset(null);
    },
  },
  methods: {
    reset(event: any) {
      setTimeout(async () => {
        try {
          (this.$refs.barraPesquisa as any).limparPesquisa();
          this.items = await this.carregarNoticiasFavoritas();
          await this.atualizarQtdNoticiasFavoritas();
        } catch {
          return;
        } finally {
          if (event) {
            event.target.complete();
          }
        }
      }, 100);
    },
    async atualizarQtdNoticiasFavoritas() {
      this.$store.commit(
        "setQtdNoticiasFavoritas",
        await this.buscaQtdNoticiasFavoritas()
      );
    },
    pesquisouNoticia(pesquisa: string) {
      if (!pesquisa || pesquisa.trim() === "") {
        this.reset(null);
        return;
      }

      this.items = this.items.filter(
        (item) =>
          item.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
          item.introducao.toLowerCase().includes(pesquisa.toLowerCase())
      );
    },
  },
});
</script>
